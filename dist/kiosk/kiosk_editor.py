import json
import os
import tkinter as tk
from tkinter import ttk, messagebox, filedialog

APP_TITLE = "Roos Kiosk Data Editor"
DEFAULT_JSON_PATH = "kiosk-data.json"
DEFAULT_JS_PATH = "kiosk-data.js"

FEATURE_KEYS = ["fireRating", "soundproofing", "mdf", "greenguard", "curvedProfile"]
APPLICATION_KEYS = ["commercial", "residential", "interior", "exterior"]

def deep_get(d, path, default=None):
    cur = d
    for p in path:
        if not isinstance(cur, dict) or p not in cur:
            return default
        cur = cur[p]
    return cur

def deep_set(d, path, value):
    cur = d
    for p in path[:-1]:
        if p not in cur or not isinstance(cur[p], dict):
            cur[p] = {}
        cur = cur[p]
    cur[path[-1]] = value

def ensure_brand_shape(brand: dict):
    brand.setdefault("id", "")
    brand.setdefault("categoryId", "")
    brand.setdefault("tileImage", "")
    brand.setdefault("name", "")
    brand.setdefault("heroImage", "")
    brand.setdefault("description", "")

    brand.setdefault("features", {})
    for k in FEATURE_KEYS:
        brand["features"].setdefault(k, False)

    brand.setdefault("specs", {})
    # keep specs flexible; no fixed keys required

    brand.setdefault("installMethods", [])
    brand.setdefault("applications", {})
    for k in APPLICATION_KEYS:
        brand["applications"].setdefault(k, False)

    brand.setdefault("pricing", {})
    brand["pricing"].setdefault("startingAt", None)
    brand["pricing"].setdefault("unit", "")

    brand.setdefault("gallery", [])

def pretty_js(obj) -> str:
    # JS can safely consume JSON; we just embed it as-is.
    payload = json.dumps(obj, indent=2, ensure_ascii=False)
    return "// AUTO-GENERATED FILE. DO NOT EDIT BY HAND.\nwindow.EXPO_DATA = " + payload + ";\n"

class KioskEditor(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title(APP_TITLE)
        self.geometry("1200x720")

        self.data = {"categories": {}, "brands": {}}
        self.json_path = DEFAULT_JSON_PATH
        self.js_path = DEFAULT_JS_PATH

        self.selected_brand_key = None

        self._build_ui()
        self._load_if_exists(DEFAULT_JSON_PATH)

    # ---------------- UI ----------------
    def _build_ui(self):
        self.columnconfigure(0, weight=0)
        self.columnconfigure(1, weight=1)
        self.rowconfigure(0, weight=1)

        # LEFT: Brand list + controls
        left = ttk.Frame(self, padding=10)
        left.grid(row=0, column=0, sticky="ns")
        left.rowconfigure(2, weight=1)

        ttk.Label(left, text="Brands").grid(row=0, column=0, sticky="w")

        self.search_var = tk.StringVar()
        self.search_var.trace_add("write", lambda *_: self._refresh_brand_list())
        ttk.Entry(left, textvariable=self.search_var, width=28).grid(row=1, column=0, sticky="we", pady=(6, 6))

        self.brand_list = tk.Listbox(left, width=35, height=28)
        self.brand_list.grid(row=2, column=0, sticky="nswe")
        self.brand_list.bind("<<ListboxSelect>>", self._on_select_brand)

        btns = ttk.Frame(left)
        btns.grid(row=3, column=0, sticky="we", pady=(10, 0))
        for i in range(3):
            btns.columnconfigure(i, weight=1)

        ttk.Button(btns, text="Add", command=self._add_brand).grid(row=0, column=0, sticky="we")
        ttk.Button(btns, text="Delete", command=self._delete_brand).grid(row=0, column=1, sticky="we", padx=6)
        ttk.Button(btns, text="Duplicate", command=self._duplicate_brand).grid(row=0, column=2, sticky="we")

        # Bottom file ops
        file_ops = ttk.Frame(left)
        file_ops.grid(row=4, column=0, sticky="we", pady=(10, 0))
        file_ops.columnconfigure(0, weight=1)
        file_ops.columnconfigure(1, weight=1)

        ttk.Button(file_ops, text="Open JSON…", command=self._open_json).grid(row=0, column=0, sticky="we")
        ttk.Button(file_ops, text="Save JSON", command=self._save_json).grid(row=0, column=1, sticky="we", padx=6)

        export_ops = ttk.Frame(left)
        export_ops.grid(row=5, column=0, sticky="we", pady=(10, 0))
        export_ops.columnconfigure(0, weight=1)
        export_ops.columnconfigure(1, weight=1)

        ttk.Button(export_ops, text="Export JS", command=self._export_js).grid(row=0, column=0, sticky="we")
        ttk.Button(export_ops, text="Set JS Path…", command=self._set_js_path).grid(row=0, column=1, sticky="we", padx=6)

        # RIGHT: Editor tabs
        right = ttk.Frame(self, padding=10)
        right.grid(row=0, column=1, sticky="nsew")
        right.rowconfigure(0, weight=1)
        right.columnconfigure(0, weight=1)

        self.tabs = ttk.Notebook(right)
        self.tabs.grid(row=0, column=0, sticky="nsew")

        self.tab_main = ttk.Frame(self.tabs, padding=10)
        self.tab_specs = ttk.Frame(self.tabs, padding=10)
        self.tab_install = ttk.Frame(self.tabs, padding=10)
        self.tab_gallery = ttk.Frame(self.tabs, padding=10)

        self.tabs.add(self.tab_main, text="Main")
        self.tabs.add(self.tab_specs, text="Specs")
        self.tabs.add(self.tab_install, text="Install Methods")
        self.tabs.add(self.tab_gallery, text="Gallery")

        self._build_main_tab()
        self._build_specs_tab()
        self._build_install_tab()
        self._build_gallery_tab()

        self.status_var = tk.StringVar(value="Ready")
        ttk.Label(right, textvariable=self.status_var).grid(row=1, column=0, sticky="we", pady=(8, 0))

    def _build_main_tab(self):
        f = self.tab_main
        for i in range(4):
            f.columnconfigure(i, weight=1)

        # basic fields
        self.v_id = tk.StringVar()
        self.v_categoryId = tk.StringVar()
        self.v_name = tk.StringVar()
        self.v_tileImage = tk.StringVar()
        self.v_heroImage = tk.StringVar()

        row = 0
        ttk.Label(f, text="id (brand key)").grid(row=row, column=0, sticky="w")
        ttk.Entry(f, textvariable=self.v_id).grid(row=row, column=1, sticky="we", padx=(6, 12))
        ttk.Label(f, text="categoryId").grid(row=row, column=2, sticky="w")
        ttk.Entry(f, textvariable=self.v_categoryId).grid(row=row, column=3, sticky="we", padx=(6, 0))
        row += 1

        ttk.Label(f, text="name").grid(row=row, column=0, sticky="w", pady=(8,0))
        ttk.Entry(f, textvariable=self.v_name).grid(row=row, column=1, columnspan=3, sticky="we", pady=(8,0), padx=(6, 0))
        row += 1

        ttk.Label(f, text="tileImage URL").grid(row=row, column=0, sticky="w", pady=(8,0))
        ttk.Entry(f, textvariable=self.v_tileImage).grid(row=row, column=1, columnspan=3, sticky="we", pady=(8,0), padx=(6, 0))
        row += 1

        ttk.Label(f, text="heroImage URL").grid(row=row, column=0, sticky="w", pady=(8,0))
        ttk.Entry(f, textvariable=self.v_heroImage).grid(row=row, column=1, columnspan=3, sticky="we", pady=(8,0), padx=(6, 0))
        row += 1

        # description
        ttk.Label(f, text="description").grid(row=row, column=0, sticky="nw", pady=(10,0))
        self.txt_desc = tk.Text(f, height=8, wrap="word")
        self.txt_desc.grid(row=row, column=1, columnspan=3, sticky="nsew", pady=(10,0), padx=(6, 0))
        f.rowconfigure(row, weight=1)
        row += 1

        # features + applications + pricing
        box = ttk.Frame(f)
        box.grid(row=row, column=0, columnspan=4, sticky="we", pady=(10,0))
        for i in range(3):
            box.columnconfigure(i, weight=1)

        feat = ttk.LabelFrame(box, text="Features", padding=10)
        feat.grid(row=0, column=0, sticky="we", padx=(0, 8))
        self.feature_vars = {k: tk.BooleanVar(value=False) for k in FEATURE_KEYS}
        for i, k in enumerate(FEATURE_KEYS):
            ttk.Checkbutton(feat, text=k, variable=self.feature_vars[k]).grid(row=i, column=0, sticky="w")

        apps = ttk.LabelFrame(box, text="Applications", padding=10)
        apps.grid(row=0, column=1, sticky="we", padx=(0, 8))
        self.app_vars = {k: tk.BooleanVar(value=False) for k in APPLICATION_KEYS}
        for i, k in enumerate(APPLICATION_KEYS):
            ttk.Checkbutton(apps, text=k, variable=self.app_vars[k]).grid(row=i, column=0, sticky="w")

        pricing = ttk.LabelFrame(box, text="Pricing", padding=10)
        pricing.grid(row=0, column=2, sticky="we")
        self.v_price_start = tk.StringVar()
        self.v_price_unit = tk.StringVar()
        ttk.Label(pricing, text="startingAt").grid(row=0, column=0, sticky="w")
        ttk.Entry(pricing, textvariable=self.v_price_start).grid(row=0, column=1, sticky="we", padx=(6,0))
        ttk.Label(pricing, text="unit").grid(row=1, column=0, sticky="w", pady=(8,0))
        ttk.Entry(pricing, textvariable=self.v_price_unit).grid(row=1, column=1, sticky="we", padx=(6,0), pady=(8,0))
        pricing.columnconfigure(1, weight=1)

        # save brand button
        ttk.Button(f, text="Apply Changes to Selected Brand", command=self._apply_current_brand).grid(
            row=row+1, column=0, columnspan=4, sticky="we", pady=(12, 0)
        )

    def _build_specs_tab(self):
        f = self.tab_specs
        f.columnconfigure(0, weight=1)
        f.rowconfigure(1, weight=1)

        ttk.Label(f, text="Specs (key/value). Add rows you want. Use empty value to hide.").grid(row=0, column=0, sticky="w")

        self.spec_tree = ttk.Treeview(f, columns=("key", "value"), show="headings", height=18)
        self.spec_tree.heading("key", text="Key")
        self.spec_tree.heading("value", text="Value")
        self.spec_tree.column("key", width=220)
        self.spec_tree.column("value", width=700)
        self.spec_tree.grid(row=1, column=0, sticky="nsew", pady=(8,0))

        btns = ttk.Frame(f)
        btns.grid(row=2, column=0, sticky="we", pady=(10, 0))
        for i in range(3):
            btns.columnconfigure(i, weight=1)

        ttk.Button(btns, text="Add Spec", command=lambda: self._kv_add(self.spec_tree)).grid(row=0, column=0, sticky="we")
        ttk.Button(btns, text="Edit Selected", command=lambda: self._kv_edit(self.spec_tree)).grid(row=0, column=1, sticky="we", padx=6)
        ttk.Button(btns, text="Remove Selected", command=lambda: self._kv_remove(self.spec_tree)).grid(row=0, column=2, sticky="we")

        ttk.Button(f, text="Apply Specs to Selected Brand", command=self._apply_current_brand).grid(row=3, column=0, sticky="we", pady=(12, 0))

    def _build_install_tab(self):
        f = self.tab_install
        f.columnconfigure(0, weight=1)
        f.rowconfigure(1, weight=1)

        ttk.Label(f, text="Install Methods (id, label, icon URL)").grid(row=0, column=0, sticky="w")
        self.install_tree = ttk.Treeview(f, columns=("id", "label", "icon"), show="headings", height=18)
        for c, w in [("id", 180), ("label", 220), ("icon", 520)]:
            self.install_tree.heading(c, text=c)
            self.install_tree.column(c, width=w)
        self.install_tree.grid(row=1, column=0, sticky="nsew", pady=(8,0))

        btns = ttk.Frame(f)
        btns.grid(row=2, column=0, sticky="we", pady=(10, 0))
        for i in range(3):
            btns.columnconfigure(i, weight=1)

        ttk.Button(btns, text="Add", command=self._install_add).grid(row=0, column=0, sticky="we")
        ttk.Button(btns, text="Edit Selected", command=self._install_edit).grid(row=0, column=1, sticky="we", padx=6)
        ttk.Button(btns, text="Remove Selected", command=lambda: self._kv_remove(self.install_tree)).grid(row=0, column=2, sticky="we")

        ttk.Button(f, text="Apply Install Methods to Selected Brand", command=self._apply_current_brand).grid(row=3, column=0, sticky="we", pady=(12, 0))

    def _build_gallery_tab(self):
        f = self.tab_gallery
        f.columnconfigure(0, weight=1)
        f.rowconfigure(1, weight=1)

        ttk.Label(f, text="Gallery (src, caption). First 4 are thumbs in your kiosk UI.").grid(row=0, column=0, sticky="w")
        self.gallery_tree = ttk.Treeview(f, columns=("src", "caption"), show="headings", height=18)
        self.gallery_tree.heading("src", text="src")
        self.gallery_tree.heading("caption", text="caption")
        self.gallery_tree.column("src", width=650)
        self.gallery_tree.column("caption", width=350)
        self.gallery_tree.grid(row=1, column=0, sticky="nsew", pady=(8,0))

        btns = ttk.Frame(f)
        btns.grid(row=2, column=0, sticky="we", pady=(10, 0))
        for i in range(3):
            btns.columnconfigure(i, weight=1)

        ttk.Button(btns, text="Add", command=self._gallery_add).grid(row=0, column=0, sticky="we")
        ttk.Button(btns, text="Edit Selected", command=self._gallery_edit).grid(row=0, column=1, sticky="we", padx=6)
        ttk.Button(btns, text="Remove Selected", command=lambda: self._kv_remove(self.gallery_tree)).grid(row=0, column=2, sticky="we")

        ttk.Button(f, text="Apply Gallery to Selected Brand", command=self._apply_current_brand).grid(row=3, column=0, sticky="we", pady=(12, 0))

    # -------------- dialogs/helpers --------------
    def _prompt(self, title, fields: list, initial=None):
        initial = initial or {}
        win = tk.Toplevel(self)
        win.title(title)
        win.transient(self)
        win.grab_set()
        win.resizable(False, False)

        vars_ = {}
        for r, (k, label) in enumerate(fields):
            ttk.Label(win, text=label).grid(row=r, column=0, sticky="w", padx=10, pady=(10 if r == 0 else 6, 0))
            v = tk.StringVar(value=initial.get(k, ""))
            vars_[k] = v
            ttk.Entry(win, textvariable=v, width=80).grid(row=r, column=1, sticky="we", padx=10, pady=(10 if r == 0 else 6, 0))

        out = {}
        def ok():
            for k in vars_:
                out[k] = vars_[k].get().strip()
            win.destroy()

        ttk.Button(win, text="OK", command=ok).grid(row=len(fields), column=0, columnspan=2, sticky="we", padx=10, pady=10)
        self.wait_window(win)
        return out if out else None

    def _kv_add(self, tree):
        res = self._prompt("Add Row", [("a", "Key"), ("b", "Value")])
        if not res: return
        tree.insert("", "end", values=(res["a"], res["b"]))

    def _kv_edit(self, tree):
        sel = tree.selection()
        if not sel:
            messagebox.showinfo("Edit", "Select a row first.")
            return
        item = sel[0]
        vals = tree.item(item, "values")
        res = self._prompt("Edit Row", [("a", "Key"), ("b", "Value")], {"a": vals[0], "b": vals[1]})
        if not res: return
        tree.item(item, values=(res["a"], res["b"]))

    def _kv_remove(self, tree):
        sel = tree.selection()
        if not sel:
            messagebox.showinfo("Remove", "Select a row first.")
            return
        for item in sel:
            tree.delete(item)

    def _install_add(self):
        res = self._prompt("Add Install Method", [("id", "id"), ("label", "label"), ("icon", "icon URL")])
        if not res: return
        self.install_tree.insert("", "end", values=(res["id"], res["label"], res["icon"]))

    def _install_edit(self):
        sel = self.install_tree.selection()
        if not sel:
            messagebox.showinfo("Edit", "Select a row first.")
            return
        item = sel[0]
        vals = self.install_tree.item(item, "values")
        res = self._prompt("Edit Install Method", [("id", "id"), ("label", "label"), ("icon", "icon URL")],
                           {"id": vals[0], "label": vals[1], "icon": vals[2]})
        if not res: return
        self.install_tree.item(item, values=(res["id"], res["label"], res["icon"]))

    def _gallery_add(self):
        res = self._prompt("Add Gallery Image", [("src", "src URL"), ("caption", "caption")])
        if not res: return
        self.gallery_tree.insert("", "end", values=(res["src"], res["caption"]))

    def _gallery_edit(self):
        sel = self.gallery_tree.selection()
        if not sel:
            messagebox.showinfo("Edit", "Select a row first.")
            return
        item = sel[0]
        vals = self.gallery_tree.item(item, "values")
        res = self._prompt("Edit Gallery Image", [("src", "src URL"), ("caption", "caption")],
                           {"src": vals[0], "caption": vals[1]})
        if not res: return
        self.gallery_tree.item(item, values=(res["src"], res["caption"]))

    # ---------------- data load/save ----------------
    def _load_if_exists(self, path):
        if os.path.exists(path):
            self._load_json(path)
        else:
            self._refresh_brand_list()

    def _open_json(self):
        p = filedialog.askopenfilename(title="Open kiosk-data.json", filetypes=[("JSON", "*.json")])
        if not p: return
        self._load_json(p)

    def _load_json(self, path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                self.data = json.load(f)
            self.json_path = path
            self.status_var.set(f"Loaded: {path}")
            self._refresh_brand_list()
            self._clear_editor()
        except Exception as e:
            messagebox.showerror("Load Error", str(e))

    def _save_json(self):
        try:
            # apply pending edits first
            self._apply_current_brand(silent=True)
            with open(self.json_path, "w", encoding="utf-8") as f:
                json.dump(self.data, f, indent=2, ensure_ascii=False)
            self.status_var.set(f"Saved JSON: {self.json_path}")
        except Exception as e:
            messagebox.showerror("Save Error", str(e))

    def _set_js_path(self):
        p = filedialog.asksaveasfilename(title="Set output kiosk-data.js", defaultextension=".js",
                                         filetypes=[("JavaScript", "*.js")])
        if not p: return
        self.js_path = p
        self.status_var.set(f"JS output set: {p}")

    def _export_js(self):
        try:
            self._apply_current_brand(silent=True)
            js = pretty_js(self.data)
            with open(self.js_path, "w", encoding="utf-8") as f:
                f.write(js)
            self.status_var.set(f"Exported JS: {self.js_path}")
            messagebox.showinfo("Exported", f"Generated:\n{self.js_path}\n\nCommit this file to GitHub.")
        except Exception as e:
            messagebox.showerror("Export Error", str(e))

    # ---------------- brand list ops ----------------
    def _refresh_brand_list(self):
        self.brand_list.delete(0, tk.END)
        brands = self.data.get("brands", {})
        q = (self.search_var.get() or "").strip().lower()

        keys = sorted(brands.keys())
        for k in keys:
            b = brands[k] or {}
            name = (b.get("name") or "").strip()
            label = f"{k}  —  {name}" if name else k
            if q and q not in k.lower() and q not in name.lower():
                continue
            self.brand_list.insert(tk.END, label)

    def _resolve_list_key(self, list_label: str) -> str:
        # list item is "key — name"
        return list_label.split("—")[0].strip()

    def _on_select_brand(self, _evt=None):
        sel = self.brand_list.curselection()
        if not sel:
            return
        label = self.brand_list.get(sel[0])
        key = self._resolve_list_key(label)
        self.selected_brand_key = key
        self._load_brand_into_editor(key)

    def _add_brand(self):
        res = self._prompt("Add Brand", [("id", "id (unique key)"), ("name", "name"), ("categoryId", "categoryId")])
        if not res: return
        key = res["id"]
        if not key:
            messagebox.showerror("Add Brand", "id is required.")
            return
        if key in self.data.get("brands", {}):
            messagebox.showerror("Add Brand", "That id already exists.")
            return

        self.data.setdefault("brands", {})
        self.data["brands"][key] = {
            "id": key,
            "name": res["name"],
            "categoryId": res["categoryId"],
        }
        ensure_brand_shape(self.data["brands"][key])
        self._refresh_brand_list()
        self.status_var.set(f"Added brand: {key}")

    def _delete_brand(self):
        if not self.selected_brand_key:
            messagebox.showinfo("Delete", "Select a brand first.")
            return
        key = self.selected_brand_key
        if messagebox.askyesno("Delete", f"Delete brand '{key}'?"):
            self.data["brands"].pop(key, None)
            self.selected_brand_key = None
            self._refresh_brand_list()
            self._clear_editor()
            self.status_var.set(f"Deleted brand: {key}")

    def _duplicate_brand(self):
        if not self.selected_brand_key:
            messagebox.showinfo("Duplicate", "Select a brand first.")
            return
        src_key = self.selected_brand_key
        res = self._prompt("Duplicate Brand", [("id", "new id (unique key)")])
        if not res: return
        new_key = res["id"]
        if not new_key:
            messagebox.showerror("Duplicate", "New id is required.")
            return
        if new_key in self.data.get("brands", {}):
            messagebox.showerror("Duplicate", "That id already exists.")
            return

        src = json.loads(json.dumps(self.data["brands"][src_key]))  # deep copy
        src["id"] = new_key
        self.data["brands"][new_key] = src
        self._refresh_brand_list()
        self.status_var.set(f"Duplicated {src_key} → {new_key}")

    # ---------------- editor load/apply ----------------
    def _clear_editor(self):
        self.v_id.set("")
        self.v_categoryId.set("")
        self.v_name.set("")
        self.v_tileImage.set("")
        self.v_heroImage.set("")
        self.txt_desc.delete("1.0", tk.END)
        for k in FEATURE_KEYS:
            self.feature_vars[k].set(False)
        for k in APPLICATION_KEYS:
            self.app_vars[k].set(False)
        self.v_price_start.set("")
        self.v_price_unit.set("")
        for tree in [self.spec_tree, self.install_tree, self.gallery_tree]:
            for item in tree.get_children():
                tree.delete(item)

    def _load_brand_into_editor(self, key):
        b = self.data.get("brands", {}).get(key)
        if not b:
            return
        ensure_brand_shape(b)

        self.v_id.set(b.get("id") or key)
        self.v_categoryId.set(b.get("categoryId") or "")
        self.v_name.set(b.get("name") or "")
        self.v_tileImage.set(b.get("tileImage") or "")
        self.v_heroImage.set(b.get("heroImage") or "")

        self.txt_desc.delete("1.0", tk.END)
        self.txt_desc.insert("1.0", b.get("description") or "")

        for k in FEATURE_KEYS:
            self.feature_vars[k].set(bool(deep_get(b, ["features", k], False)))

        for k in APPLICATION_KEYS:
            self.app_vars[k].set(bool(deep_get(b, ["applications", k], False)))

        # pricing
        starting = deep_get(b, ["pricing", "startingAt"], None)
        self.v_price_start.set("" if starting is None else str(starting))
        self.v_price_unit.set(deep_get(b, ["pricing", "unit"], "") or "")

        # specs
        for item in self.spec_tree.get_children():
            self.spec_tree.delete(item)
        specs = b.get("specs") or {}
        for sk, sv in specs.items():
            self.spec_tree.insert("", "end", values=(sk, "" if sv is None else str(sv)))

        # install methods
        for item in self.install_tree.get_children():
            self.install_tree.delete(item)
        for m in (b.get("installMethods") or []):
            self.install_tree.insert("", "end", values=(m.get("id",""), m.get("label",""), m.get("icon","")))

        # gallery
        for item in self.gallery_tree.get_children():
            self.gallery_tree.delete(item)
        for g in (b.get("gallery") or []):
            self.gallery_tree.insert("", "end", values=(g.get("src",""), g.get("caption","")))

        self.status_var.set(f"Editing: {key}")

    def _apply_current_brand(self, silent=False):
        if not self.selected_brand_key:
            if not silent:
                messagebox.showinfo("Apply", "Select a brand first.")
            return

        key = self.selected_brand_key
        b = self.data["brands"].get(key)
        if not b:
            return
        ensure_brand_shape(b)

        # id changes require key migration
        new_id = (self.v_id.get() or "").strip()
        if not new_id:
            if not silent:
                messagebox.showerror("Apply", "id cannot be empty.")
            return

        if new_id != key:
            if new_id in self.data["brands"]:
                if not silent:
                    messagebox.showerror("Apply", f"Cannot rename to '{new_id}' because it already exists.")
                return
            # migrate
            self.data["brands"][new_id] = b
            del self.data["brands"][key]
            self.selected_brand_key = new_id
            key = new_id
            b = self.data["brands"][key]

        b["id"] = key
        b["categoryId"] = (self.v_categoryId.get() or "").strip()
        b["name"] = (self.v_name.get() or "").strip()
        b["tileImage"] = (self.v_tileImage.get() or "").strip()
        b["heroImage"] = (self.v_heroImage.get() or "").strip()
        b["description"] = self.txt_desc.get("1.0", tk.END).strip()

        for k in FEATURE_KEYS:
            b["features"][k] = bool(self.feature_vars[k].get())

        for k in APPLICATION_KEYS:
            b["applications"][k] = bool(self.app_vars[k].get())

        # pricing parse
        raw_start = (self.v_price_start.get() or "").strip()
        if raw_start == "":
            b["pricing"]["startingAt"] = None
        else:
            try:
                b["pricing"]["startingAt"] = int(raw_start)
            except ValueError:
                # allow float too if you want
                try:
                    b["pricing"]["startingAt"] = float(raw_start)
                except ValueError:
                    if not silent:
                        messagebox.showerror("Apply", "pricing.startingAt must be a number or empty.")
                    return
        b["pricing"]["unit"] = (self.v_price_unit.get() or "").strip()

        # specs
        specs = {}
        for item in self.spec_tree.get_children():
            sk, sv = self.spec_tree.item(item, "values")
            sk = (sk or "").strip()
            sv = (sv or "").strip()
            if not sk:
                continue
            specs[sk] = (None if sv == "" else sv)
        b["specs"] = specs

        # install methods
        install = []
        for item in self.install_tree.get_children():
            mid, label, icon = self.install_tree.item(item, "values")
            install.append({"id": mid.strip(), "label": label.strip(), "icon": icon.strip()})
        b["installMethods"] = install

        # gallery
        gallery = []
        for item in self.gallery_tree.get_children():
            src, caption = self.gallery_tree.item(item, "values")
            gallery.append({"src": src.strip(), "caption": caption.strip()})
        b["gallery"] = gallery

        self._refresh_brand_list()
        self.status_var.set(f"Applied changes: {key}")
        if not silent:
            messagebox.showinfo("Applied", "Changes applied to in-memory data.\nSave JSON and/or Export JS when ready.")

if __name__ == "__main__":
    app = KioskEditor()
    app.mainloop()
