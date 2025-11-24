<script>
  window.EXPO_DATA = {
    categories: {
      architectural: {
        id: 'architectural',
        name: 'Architectural Panels & Screens',
        collections: [
          'interlam-art-diffusion',
          'interlam-elements',
          'duchateau-motif',
          'duchateau-inceptiv',
          'duchateau-moderne',
          'duchateau-pictura',
          'duchateau-celestio-legno',
          'interlam-carved-screens'
          // add other architectural brands here later
        ]
      },
      acoustical: {
        id: 'acoustical',
        name: 'Acoustical Solutions',
        collections: [
          'acoustical-art-concepts'
          // add other architectural brands here later
        ]
      },
      laminates: {
        id: 'laminates',
        name: 'Laminates & Veneers',
        collections: [
          'lab-designs'
          // add other architectural brands here later
        ]
      },      
      specialty: {
        id: 'specialty',
        name: 'Specialty Prodcuts',
        collections: [
          'transonyx'
          // add other architectural brands here later
        ]
      },
      wallcoverings: {
        id: 'wallcoverings',
        name: 'Wallcoverings',
        collections: [
          'interlam-art-diffusion'
          // add other architectural brands here later
        ]
      },
      digital: {
        id: 'digital',
        name: 'Digital Products',
        collections: [
          'Resonance Art'
          // add other architectural brands here later
        ]
      }
      
      // add acoustical, laminates, etc. later
    },

    brands: {
      
        'interlam-art-diffusion': {
            id: 'interlam-art-diffusion',
            categoryId: 'architectural',

            // tile image used on the collections screen
            tileImage: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926333989-photo22.JPG?alt=media&token=618d6393-9977-4776-b855-c6713acf5d83',

            // brand detail
            name: 'Interlam Art Diffusion',
            heroImage: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926333289-photo21.JPG?alt=media&token=eba4820d-5cd7-4914-b652-7f3cc09fbb4d',
            description:
            'The Art Diffusion collection consists of over 150 architectural wall panel patterns that offer a dramatic alternative to traditional flat wall panels. Sculpted and carved designs introduce depth, shadow, and movement to walls in hospitality, commercial, and residential interiors.',

            // Which feature icons to light up
            features: {
            fireRating: true,
            soundproofing: false,
            mdf: true,
            greenguard: false,
            curvedProfile: true
            },

            // Specs: use null to hide a row, string to show it
            specs: {
            dimensions: '4\' x 8\' (standard)',
            thickness: 'Varies by pattern',
            finish: 'Raw, primed, or factory-finished options',
            patternDepth: 'Varies by pattern'
            },

            // Installation methods to show in the “Installation Methods” card
            installMethods: [
            {
                id: 'z-clips',
                label: 'Z-Clips',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d868d996d4d0b794853_hd-azclip-2%201.png'
            },
            {
                id: 'construction-adhesive',
                label: 'Construction Adhesive',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d86fd168ec4433c74a8_Liquid-Nails%201.png'
            },
            {
                id: 'direct-screw',
                label: 'Direct Screw Attachment',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d8602c11b3df898dc1e_image%205.png'
            }
            ],

            // Applications toggles the green/grey pills
            applications: {
            commercial: true,
            residential: true,
            interior: true,
            exterior: false
            },

            // Price card
            pricing: {
            startingAt: 29,   // starting price
            unit: 'sqft'      // text after slash
            },

            // Gallery: Lightbox will use ALL of these.
            // First 4 become thumbnails; the rest count toward "X+"
            gallery: [
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761925957789-full_sou009-antiqued-copper-bar-wall-001.jpg?alt=media&token=49b00668-397d-4c1b-adfb-79fbcd5047bd',
                caption: 'Art Diffusion panels framing a modern fireplace.'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761925957087-full_sot002-decorative-wall-panels-010.jpg?alt=media&token=46ca36f4-ba5b-44b0-b9f0-1df9db4cf7f2',
                caption: 'Wave-pattern Art Diffusion feature wall in a hotel lobby.'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926310575-IMG_1263.JPG?alt=media&token=ed336452-026f-42bb-a2b2-101a09d7a54e',
                caption: 'Restaurant bar front with sculpted panels and integrated lighting.'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926290117-Art%20Diffusion-sot403x2-Obagi%20clinic-South%20carolina.jpg?alt=media&token=2a42c7f7-01bb-4364-9498-7bcb2a33642d',
                caption: 'Reception desk wrapped with continuous Art Diffusion motifs.'
            },
            // everything from here down is "extra" that feeds the 20+ count
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926284829-Art%20DIffusion-%20kitchen%202.jpg?alt=media&token=c6580e05-6461-4015-8829-d6480f47972d',
                caption: 'Conference room feature wall with horizontal relief panels.'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926169887-SOU001.jpg?alt=media&token=d2d9f61e-9862-4bcf-a3d5-b76f9a63cc7a',
                caption: 'Branded retail environment with sculpted background wall.'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926154751-SOT002.jpg?alt=media&token=b965f63f-8180-47ab-91f2-8865dd9d9b62',
                caption: 'Art Diffusion panels used as a backdrop for a hotel lounge.'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926063281-Leo%20Burnett%20_Resepsjon1.JPG?alt=media&token=2252f686-cbf8-4e59-afb7-a8d8e0d3c571',
                caption: 'Curved wall application highlighting flowing panel patterns.'
            }
            // Add more image objects here.
            ]
        },
    
        	// Paste this inside your brands object:
        'interlam-elements': {
            id: 'interlam-elements',
            categoryId: 'architectural',

            // tile image used on the collections screen
            tileImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643ed930cb6d71e15bd1e32d_Elements-Facets-II-web.jpg',

            // brand detail
            name: 'Interlam Elements',
            heroImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643ed930cb6d71e15bd1e32d_Elements-Facets-II-web.jpg',
            description:
            'Ludwig Mies van der Rohe, a German-American architect, is widely recognized as one of the most influential figures in the field of modern architecture. His work is characterized by his innovative use of materials, such as steel and glass, and his minimalist approach to design. He believed that buildings should be functional and efficient, while also being aesthetically pleasing. His design philosophy was based on the idea that less is more, and he sought to simplify and streamline the design process by eliminating unnecessary ornamentation and emphasizing clean lines and geometric shapes. His emphasis on simplicity, functionality, and minimalism has become a cornerstone of modern design, and his use of innovative materials and techniques has paved the way for new advances in construction and engineering. For these reasons and more, Ludwig Mies van der Rohe remains a true master of modern architecture. The Elements collection adopts these principals.',

            // Which feature icons to light up
            features: {
            fireRating: true,
            soundproofing: false,
            mdf: true,
            greenguard: false,
            curvedProfile: true
            },

            // Specs: use null to hide a row, string to show it
            specs: {
            dimensions: '4\' x 8\'',
            thickness: 'Varies by pattern',
            finish: 'Raw, primed, or factory finished',
            patternDepth: 'Varies by pattern'
            },

            // Installation methods to show in the “Installation Methods” card
            installMethods: [
            {
                id: 'z-clips',
                label: 'Z-Clips',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d868d996d4d0b794853_hd-azclip-2%201.png'
            },
            {
                id: 'construction-adhesive',
                label: 'Construction Adhesive',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d86fd168ec4433c74a8_Liquid-Nails%201.png'
            },
            {
                id: 'direct-screw',
                label: 'Direct Screw Attachment',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d8602c11b3df898dc1e_image%205.png'
            }
            ],

            // Applications toggles the green/grey pills
            applications: {
            commercial: true,
            residential: true,
            interior: true,
            exterior: false
            },

            // Price card
            pricing: {
            startingAt: null,
            unit: ''
            },

            // Gallery: first 4 become thumbnails; the rest feed the X+ count
            gallery: [
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926462180-image3.jpg?alt=media&token=9fabc8bf-cc5f-4300-a3d2-1c2fb607747e',
                caption: 'Facets DS pattern in a blue hue ambient lighting'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926458663-image2.jpg?alt=media&token=6dc854d2-3e6d-4ae5-988b-7b7b314ab929',
                caption: 'Facets DS pattern in a purple hue ambient lighting'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926454865-facets%20(2).jpg?alt=media&token=a3bfb242-e74f-4e34-b06c-58fdbea82565',
                caption: 'Facets pattern installed on a backsplash in a reception desk (1 of 3)'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926455677-facets%20with%20non%20gloss%20maple%20foil.jpg?alt=media&token=a10f7467-c9f3-4ae9-99b0-c10e8051a2f3',
                caption: 'Facets pattern installed on a backsplash in a reception desk (2 of 3)'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926454865-facets%20(2).jpg?alt=media&token=a3bfb242-e74f-4e34-b06c-58fdbea82565',
                caption: 'Facets pattern installed on a backsplash in a reception desk (3 of 3)'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926451209-Elements-Facets-2.jpg?alt=media&token=c111dd49-abb4-42fa-9d70-a7da97d95f17',
                caption: 'Facets II installed in a living room wall'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926453378-Elements-Facets-II-web.jpg?alt=media&token=14b8e187-9967-4978-9cbe-2da417892fea',
                caption: 'Facets installed behind a reception desk'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926441728-Elements%20-%20Thatch.JPG?alt=media&token=dd641e11-1c63-497b-bb96-f52dd48ec745',
                caption: 'Thatch installed as a barndoor frame'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926440309-Elements%20-%20Nazca%205.JPG?alt=media&token=0c33a1b5-c1ff-474d-9d6e-caaf6f8808b2',
                caption: 'Nazca installed on a wall inside a bar (1 of 5)'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926440992-Elements%20-%20Nazca.JPG?alt=media&token=c9388435-46d0-4d15-9909-1e63b3124a50',
                caption: 'Nazca installed on a wall inside a bar (2 of 5)'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926439524-Elements%20-%20Nazca%204.JPG?alt=media&token=6eee348b-834e-4127-8a1c-c4d5145043e8',
                caption: 'Nazca installed on a wall inside a bar (3 of 5)'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926431858-Elements%20-%20Nazca%202.JPG?alt=media&token=db0cd2cc-9269-4957-b766-f1e22862f7ad',
                caption: 'Nazca installed on a wall inside a bar (4 of 5)'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926432531-Elements%20-%20Nazca%203.JPG?alt=media&token=79a57cb5-3600-4bd3-9f5a-6566080d5511',
                caption: 'Nazca installed on a wall inside a bar (5 of 5)'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926345694-Tsukoro%20rest.jpg?alt=media&token=b17a96a9-548c-4f76-9975-5761b0a294cf',
                caption: 'Nazca installed on a wall in a Sushi bar'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926323847-Movie%20Lounge-16%20REV.jpg?alt=media&token=c6b75358-e0cd-47f8-90a2-7af8297e0b1f',
                caption: 'Nazca installed in a restaurant'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926033369-Iris%20-%20Snow%20White%20Membrane%20Finish.JPG?alt=media&token=27cae4d0-440d-43c2-81d8-c2c52f8b7d72',
                caption: 'Iris panel 4\' x 8\' (1 of 2)'
            },
            {
                src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926031167-Iris%20-%20Snow%20White%20Membrane%20Finish%20(2).JPG?alt=media&token=dc5dae1b-7932-4f95-8e76-1dbedf802de4',
                caption: 'Iris panel 4\' x 8\' (2 of 2)'
            }
            ]
        },
        // Paste this inside your brands object:
            'duchateau-motif': {
              id: 'duchateau-motif',
              categoryId: 'architectural',

              // tile image used on the collections screen
              tileImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cadc7629551a381df47be6_WEB-blume.webp',

              // brand detail
              name: 'Duchateau Motif',
              heroImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cadc7629551a381df47be6_WEB-blume.webp',
              description:
                'The Motiff Collection offers four flat and dimensional patterns. Floor and wall are both covered with one pattern. Inspired by geometric architecture and the roots of all forms. As an architect, Joe Langenauer explored how five-sided pentagrams join and scale, creating an entirely new design expression, looking for where the interplay of depth, light, and surface comes together. The flat pattern is designed for both floor and wall installation. The dimensional pattern is designed for wall installations, creating appealing shadows from the angled surfaces.',

              // Which feature icons to light up
              features: {
                fireRating: true,
                soundproofing: false,
                mdf: false,
                greenguard: false,
                curvedProfile: false
              },

              // Specs: use null to hide a row, string to show it
              specs: {
                dimensions: '4\' x 8\'',
                thickness: 'Varies by pattern',
                finish: 'Raw, primed, or factory finished',
                patternDepth: 'Varies by pattern'
              },

              // Installation methods to show in the “Installation Methods” card
              installMethods: [
                {
                  id: 'z-clips',
                  label: 'Z-Clips',
                  icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d868d996d4d0b794853_hd-azclip-2%201.png'
                },
                {
                  id: 'construction-adhesive',
                  label: 'Construction Adhesive',
                  icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d86fd168ec4433c74a8_Liquid-Nails%201.png'
                },
                {
                  id: 'direct-screw',
                  label: 'Direct Screw Attachment',
                  icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d8602c11b3df898dc1e_image%205.png'
                }
              ],

              // Applications toggles the green/grey pills
              applications: {
                commercial: true,
                residential: true,
                interior: true,
                exterior: false
              },

              // Price card
              pricing: {
                startingAt: null,
                unit: ''
              },

              // Gallery: first 4 become thumbnails; the rest feed the X+ count
              gallery: [
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caced64ae3330570da1387_Z4B0lpbqstJ99Smu_Motif-Forma-Raw-Walnut-768x768.avif',
                  caption: 'Duchateau Motif Blume in Dimensional Darkened Walnut'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cadc7629551a381df47be6_WEB-blume.webp',
                  caption: 'Duchateau Motif Blume in Dimensional Natural Oak'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cadc92e32af0f96aa2cbd6_blume_dimensional_Noir.webp',
                  caption: 'Duchateau Motif Blume in Dimensional Noir'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caced8b457bbb25fa20795_Motif-Blume-Flat-Wall-Raw-Walnut.webp',
                  caption: 'Duchateau Motif Blume in Flat Darkened Walnut'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cadc78447b7294c43c66e7_Blume_Flat_Natural_Oak.webp',
                  caption: 'Duchateau Motif Blume in Flat Natural Oak'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cadc888ea4f2467ba4d605_Blume_Flat_Noir.webp',
                  caption: 'Duchateau Motif Blume in Flat Noir'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caef920f08eace064e514f_contour_Flat_Natural_Oak.webp',
                  caption: 'Duchateau Motif Contour in Flat Natural Oak'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caef957549b2082b0b86b5_contour_Flat_raw_walnut.webp',
                  caption: 'Duchateau Motif Contour in Flat Raw Walnut'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caef96fdf047f9424121ef_contour_Flat_darkened_walnut.webp',
                  caption: 'Duchateau Motif Contour in Flat Darkened Walnut'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caef9addbc9cccbe14dabf_contour_Flat_noir.webp',
                  caption: 'Duchateau Motif Contour in Flat Noir'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caef9c75540d248aa97d3f_Contour_Dimensional_Natural_Oak.webp',
                  caption: 'Duchateau Motif Contour in Dimensional Natural Oak'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caef9e2c5043080c8c1156_Contour_Dimensional_Raw_Walnut.webp',
                  caption: 'Duchateau Motif Contour in Dimensional Raw Walnut'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caefa6b6f7edca9f87df09_Contour_Dimensional_Darkened_Walnut.webp',
                  caption: 'Duchateau Motif Contour in Dimensional Darkened Walnut'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cacf06f428cb9095c70249_Z5FbmpbqstJ99wKo_1080pMotifFormaPicture.avif',
                  caption: 'Duchateau Motif Forma in Dimensional Darkened Walnut'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cae12a8b03fcfdfe46c798_Forma_Flat_Natural_Oak.webp',
                  caption: 'Duchateau Motif Forma in Flat Natural Oak'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cae12c7c34159fdaf9e1e6_Forma_Flat_Raw_Walnut.webp',
                  caption: 'Duchateau Motif Forma in Flat Raw Walnut'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cae12d0f7c6432c9d1932b_Forma_Flat_darkened_Walnut.webp',
                  caption: 'Duchateau Motif Forma in Flat Darkened Walnut'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cae12f23ea6040242b533d_Forma_Flat_Noir.webp',
                  caption: 'Duchateau Motif Forma in Flat Noir'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cae13258a8292c99c72620_Forma_Dimensional_Natural_Oak.webp',
                  caption: 'Duchateau Motif Forma in Dimensional Natural Oak'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cae133f6323cd34baea0d7_Forma_Dimensional_Raw_Walnut.webp',
                  caption: 'Duchateau Motif Forma in Dimensional Raw Walnut'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cae1358b03fcfdfe46ca70_Forma_Dimensional_Darkened_Walnut.webp',
                  caption: 'Duchateau Motif Forma in Dimensional Darkened Walnut'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cae13685c8e478bd2c279e_Forma_Dimensional_Noir.webp',
                  caption: 'Duchateau Motif Forma in Dimensional Noir'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caeffcff9507e294ddc991_Z4B2yZbqstJ99Sm__v1MotifRokuRender.avif',
                  caption: 'Duchateau Motif Roku'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caf06023ea60402430658a_Roku_Falt_Raw_Natural_Oak.webp',
                  caption: 'Duchateau Motif Roku in Flat Natural Oak'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caf0615dc4169707361d3f_Roku_Falt_Raw_Walnut.webp',
                  caption: 'Duchateau Motif Roku in Flat Raw Walnut'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caf06306a0804721dab874_Roku_Falt_Darkened_Walnut.webp',
                  caption: 'Duchateau Motif Roku in Flat Darkened Walnut'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caf0659f39b47b757b25d3_Roku_Falt_Raw_Noir.webp',
                  caption: 'Duchateau Motif Roku in Flat Noir'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caf0664e2e738e49b832a5_Roku_Dimensional_Natural_Oak.webp',
                  caption: 'Duchateau Motif Roku in Dimensional Natural Oak'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caf068c9ac250c4b4fc0bf_Roku_Dimensional_Raw_Walnut.webp',
                  caption: 'Duchateau Motif Roku in Dimensional Raw Walnut'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caf0699522733829ad2680_Roku_Dimensional_Darkened_Walnut.webp',
                  caption: 'Duchateau Motif Roku in Dimensional Darkened Walnut'
                },
                {
                  src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68caf06b216caa7834eda27f_Roku_Dimensional_Noir.webp',
                  caption: 'Duchateau Motif Roku in Dimensional Noir'
                }
              ]
            },
            
            // Paste this inside your brands object:
          'duchateau-inceptiv': {
            id: 'duchateau-inceptiv',
            categoryId: 'architectural',

            // tile image used on the collections screen
            tileImage: 'https://duchateau.com/wp-content/uploads/2025/10/BusinessClubofTijuanaInfuse.avif',

            // brand detail
            name: 'Duchateau Inceptive',
            heroImage: 'https://duchateau.com/wp-content/uploads/2025/10/BusinessClubofTijuanaVertex-scaled.avif',
            description:
              'A classic redefined through volume. Intricate designs form expressions of fluid texture. Joined and finished by hand, and designed in Southern California.',

            // Which feature icons to light up
            features: {
              fireRating: false,
              soundproofing: false,
              mdf: false,
              greenguard: false,
              curvedProfile: false
            },

            // Specs: use null to hide a row, string to show it
            specs: {
              dimensions: 'Varies by pattern',
              thickness: 'Varies by pattern',
              finish: 'Oak or Walnut',
              patternDepth: 'Varies by pattern'
            },

            // Installation methods to show in the “Installation Methods” card
            installMethods: [
              {
                id: 'z-clips',
                label: 'Z-Clips',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d868d996d4d0b794853_hd-azclip-2%201.png'
              },
              {
                id: 'construction-adhesive',
                label: 'Construction Adhesive',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d86fd168ec4433c74a8_Liquid-Nails%201.png'
              },
              {
                id: 'direct-screw',
                label: 'Direct Screw Attachment',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d8602c11b3df898dc1e_image%205.png'
              }
            ],

            // Applications toggles the green/grey pills
            applications: {
              commercial: true,
              residential: true,
              interior: true,
              exterior: false
            },

            // Price card
            pricing: {
              startingAt: null,
              unit: ''
            },

            // Gallery: first 4 become thumbnails; the rest feed the X+ count
            gallery: [
              {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/American-Walnut-Arc-Chevron-1.avif',
                caption: 'Duchateau Inceptive Arc Chevron in Walnut'
              },
              {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/InceptivCrest-NaturalAmericanWalnut2CJABDesignGroup.avif',
                caption: 'Duchateau Inceptive Crest in Walnut'
              },
              {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/BusinessClubofTijuanaCurva.avif',
                caption: 'Duchateau Inceptive Curva in Walnut'
              },
              {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/CurvaChevronAmericanWalnut-KennayFarms.avif',
                caption: 'Duchateau Inceptive Curva Chevron in Walnut'
              },
              {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/Celestio-Legno-Project-3_800x800_crop_top.jpg?v=1762465559',
                caption: 'Duchateau Inceptive Edge in Walnut'
              },
              {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/WallPanel-InfuseinRestaurant1.avif',
                caption: 'Duchateau Inceptive Infuse in Walnut'
              },
              {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/Residence_Crescent_Stout-scaled_800x800_crop_top.jpg?v=1762475007',
                caption: 'Duchateau Inceptive Krescent in Walnut (1 of 2)'
              },
              {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/Residence_Crescent_Stout2-scaled_800x800_crop_top.jpg?v=1762475007',
                caption: 'Duchateau Inceptive Krescent in Walnut (2 of 2)'
              },
              {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/AMERICAN-WALNUT-Kuadra-42_web-1.avif',
                caption: 'Duchateau Inceptive Kuadra in Walnut'
              },
              {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/Kubik_American_Walnut_Square_800x800_crop_top.png?v=1762478203',
                caption: 'Duchateau Inceptive Kubik in Walnut'
              },
              {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/Metamorphosis.Gold_-scaled_800x800_crop_top.jpg?v=1731059326',
                caption: 'Duchateau Inceptive Metamorphosis in Walnut'
              },
              {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/HCP-Mayo-20_800x800_crop_top.jpg?v=1762479659',
                caption: 'Duchateau Inceptive Parallels in Walnut (1 of 3)'
              },
              {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/WC-langenauer-4377-1-1_800x800_crop_top.jpg?v=1762479659',
                caption: 'Duchateau Inceptive Parallels in Walnut (2 of 3)'
              },
              {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/MedicalOffice_Parallels_Sand-scaled_800x800_crop_top.jpg?v=1762479659',
                caption: 'Duchateau Inceptive Parallels in Natural Oak (3 of 3)'
              },
              {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/Wall-Panel-Doubletree-Nashua-Hilton-Scale-Reckt-American-Walnut_800x800_crop_top.jpg?v=1762482228',
                caption: 'Duchateau Inceptive Scale Reckt in American Walnut'
              },
              {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/Tresses_American_Walnut_Square_800x800_crop_top.png?v=1762476075',
                caption: 'Duchateau Inceptive Tresses in American Walnut'
              },
              {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/Man-Caves-267_800x800_crop_top.jpg?v=1762479171',
                caption: 'Duchateau Inceptive Vertex in American Walnut'
              },
              {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/5z8a7800_800x800_crop_top.jpg?v=1762479171',
                caption: 'Duchateau Inceptive Vertex in American Walnut'
              },
              {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/Wave_American_Walnut_Square_800x800_crop_top.png?v=1762480572',
                caption: 'Duchateau Inceptive Wave in American Walnut'
              }
            ]
          },

        // Paste this inside your brands object:
            'duchateau-moderne': {
            id: 'duchateau-moderne',
            categoryId: 'architectural',

            // tile image used on the collections screen
            tileImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cc231e27752658a747296d_Z38YqJbqstJ99Msv_ModerneGrandeCourbeNoir.avif',

            // brand detail
            name: 'Duchateau Moderne',
            heroImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cc1fc02da824fd2b9f5c00_Z38ax5bqstJ99Ms7__DGL8169.avif',
            description:
                'The Moderne Collection was born from a desire for flexibility-textures that could wrap flat and curved surfaces seamlessly and open design possibilities... In response, artisans crafted links to join flutes together and bend inward and outward, transcending our traditional flat panel application of wall coverings. The varieties in dimension and style offer subtler and bolder fluting effects rooted in classical architecture, reimagined with modern lines and textures. 1 convex design and 3 concave designs in increasing widths are each offered in both flat and the flexible link version that can curve.',

            // Which feature icons to light up
            features: {
                fireRating: false,
                soundproofing: false,
                mdf: false,
                greenguard: false,
                curvedProfile: false
            },

            // Specs: use null to hide a row, string to show it
            specs: {
                dimensions: 'Varies by pattern',
                thickness: 'Varies by pattern',
                finish: 'Flat - UV Lacquer | Dimensional - Lacquer',
                patternDepth: 'Varies by pattern'
            },

            // Installation methods to show in the “Installation Methods” card
            installMethods: [
                {
                id: 'z-clips',
                label: 'Z-Clips',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d868d996d4d0b794853_hd-azclip-2%201.png'
                },
                {
                id: 'construction-adhesive',
                label: 'Construction Adhesive',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d86fd168ec4433c74a8_Liquid-Nails%201.png'
                },
                {
                id: 'direct-screw',
                label: 'Direct Screw Attachment',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d8602c11b3df898dc1e_image%205.png'
                }
            ],

            // Applications toggles the green/grey pills
            applications: {
                commercial: true,
                residential: true,
                interior: true,
                exterior: false
            },

            // Price card
            pricing: {
                startingAt: null,
                unit: ''
            },

            // Gallery: first 4 become thumbnails; the rest feed the X+ count
            gallery: [
                {
                src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cc2c1729ebbf26bce74fbc_WEBP-Moderne-Arque-Natural-Office.webp',
                caption: 'Duchateau Moderne Arque in Natural Walnut'
                },
                {
                src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cc2ee6f8403c20bc78c9c4_WEBP-Grande-Courbe-Raw-Walnut-Lobby.webp',
                caption: 'Duchateau Moderne Courbe in Natural Walnut'
                },
                {
                src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cc272746817afd24734e23_WEBP-Moyen-Courbe-Natural-Hallway-CROPPED.webp',
                caption: 'Duchateau Moderne Moyen Courbe in Natural Walnut'
                },
                {
                src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68cc2e0852cbf31ddeb95771_WEBP-Coube-Petite-Raw-Walnut-Living-Room.webp',
                caption: 'Duchateau Moderne Petite Courbe in Raw Walnut'
                }
            ]
            },
            
                        // Paste this inside your brands object:
            'duchateau-pictura': {
            id: 'duchateau-pictura',
            categoryId: 'architectural',

            // tile image used on the collections screen
            tileImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/65b7ecb520ac717cb3c18fcf_Pictura-Chord-Soft-White.webp',

            // brand detail
            name: 'Duchateau Pictura',
            heroImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/65b7ecb520ac717cb3c18fcf_Pictura-Chord-Soft-White.webp',
            description:
                'The Pictura collection finds it’s inspiration in that profound shift in how we perceive space, form, and beauty. Four styles explore the interplay of light and shadow. Chord and Lunette offer a softness to space, where Cadence and Rhythm create dimensionality and visual delight. The pattern design are intended for broader applications and wider spaces where they express at scale.',

            // Which feature icons to light up
            features: {
                fireRating: false,
                soundproofing: false,
                mdf: false,
                greenguard: false,
                curvedProfile: false
            },

            // Specs: use null to hide a row, string to show it
            specs: {
                dimensions: 'Varies by pattern',
                thickness: 'Varies by pattern',
                finish: 'Lacquer',
                patternDepth: 'Varies by pattern'
            },

            // Installation methods to show in the “Installation Methods” card
            installMethods: [
                {
                id: 'z-clips',
                label: 'Z-Clips',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d868d996d4d0b794853_hd-azclip-2%201.png'
                },
                {
                id: 'construction-adhesive',
                label: 'Construction Adhesive',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d86fd168ec4433c74a8_Liquid-Nails%201.png'
                },
                {
                id: 'direct-screw',
                label: 'Direct Screw Attachment',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d8602c11b3df898dc1e_image%205.png'
                }
            ],

            // Applications toggles the green/grey pills
            applications: {
                commercial: true,
                residential: true,
                interior: true,
                exterior: false
            },

            // Price card
            pricing: {
                startingAt: null,
                unit: ''
            },

            // Gallery: first 4 become thumbnails; the rest feed the X+ count
            gallery: [
                {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/CadenceSoftWhite-2048x1152.jpg',
                caption: 'Duchateau Pictura Cadence in Natural Oak'
                },
                {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/ParallaxSwatches-Pictura-Cadence-SoftWhite.avif',
                caption: 'Duchateau Pictura Cadence in Soft White'
                },
                {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/Cadencesmallerbigimageforsite.avif',
                caption: 'Duchateau Pictura Cadence in Natural Oak'
                },
                {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/PicturaChordNatural-2048x1152.jpg',
                caption: 'Duchateau Pictura Chord in Natural Oak'
                },
                {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/PicturaChordNaturalRoomSceneSquare_800x800_crop_top.webp?v=1763065019',
                caption: 'Duchateau Pictura Chord in Darkened Walnut'
                },
                {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/Pictura-Ridge-Natural.avif',
                caption: 'Duchateau Pictura Chord in Natural Oak'
                },
                {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/LunetteDarkenedWalnut-2048x1152.jpg',
                caption: 'Duchateau Pictura Lunette in Raw Walnut'
                },
                {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/RhythmNoir-2048x1152.jpg',
                caption: 'Duchateau Pictura Rhythm in Noir'
                },
                {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/Pictura-Rhythm-Noir.avif',
                caption: 'Duchateau Pictura Rhythm in Noir'
                }
            ]
            },

            // Paste this inside your brands object:
            'duchateau-celestio-legno': {
            id: 'duchateau-celestio-legno',
            categoryId: 'architectural',

            // tile image used on the collections screen
            tileImage: 'https://duchateau.com/wp-content/uploads/2025/11/Celestio-Legno-Cobble-Jinya-Ramen-x-DUCHATEAU-4.jpg',

            // brand detail
            name: 'Duchateau Celestio Legno',
            heroImage: 'https://duchateau.com/wp-content/uploads/2025/11/Celestio-Legno-Cobble-Jinya-Ramen-x-DUCHATEAU-4.jpg',
            description:
                '3D Wood Wall Panels are designed by native of Mexico City and architect Joe Langenauer, who finds architectural beauty in nature’s geometry and brings passion and ingenuity to Duchateau’s exclusive line of luxury wall coverings.',

            // Which feature icons to light up
            features: {
                fireRating: false,
                soundproofing: false,
                mdf: false,
                greenguard: false,
                curvedProfile: false
            },

            // Specs: use null to hide a row, string to show it
            specs: {
                dimensions: 'Varies by pattern',
                thickness: 'Varies by pattern',
                finish: 'Smooth | Light Wire Brush',
                patternDepth: 'Varies by pattern'
            },

            // Installation methods to show in the “Installation Methods” card
            installMethods: [
                {
                id: 'z-clips',
                label: 'Z-Clips',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d868d996d4d0b794853_hd-azclip-2%201.png'
                },
                {
                id: 'construction-adhesive',
                label: 'Construction Adhesive',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d86fd168ec4433c74a8_Liquid-Nails%201.png'
                },
                {
                id: 'direct-screw',
                label: 'Direct Screw Attachment',
                icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d8602c11b3df898dc1e_image%205.png'
                }
            ],

            // Applications toggles the green/grey pills
            applications: {
                commercial: true,
                residential: true,
                interior: true,
                exterior: false
            },

            // Price card
            pricing: {
                startingAt: null,
                unit: ''
            },

            // Gallery: first 4 become thumbnails; the rest feed the X+ count
            gallery: [
                {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/AngledHexo-2048x1365.jpg',
                caption: 'Duchateau Celestio Legno Angled Hexo in American Walnut'
                },
                {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/Cobble-2048x1365.jpg',
                caption: 'Duchateau Celestio Legno Cobble in American Walnut'
                },
                {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/Gem-2048x1365.jpg',
                caption: 'Duchateau Celestio Legno Gem in American Walnut'
                },
                {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/HexoSQUARE_800x800_crop_top.png?v=1763162529',
                caption: 'Duchateau Celestio Legno Hexo in American Walnut'
                },
                {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/Hard-Board-Jig-Iceberg-Oak.avif',
                caption: 'Duchateau Celestio Legno Jig in Iceberg Oak'
                },
                {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/CelestioLegno_Pinnacle_Side.avif',
                caption: 'Duchateau Celestio Legno Pinnacle in American Walnut'
                },
                {
                src: 'https://cdn.shopify.com/s/files/1/0614/3049/7366/files/CelestioLegno_Pixel_Side_800x800_crop_top.jpg?v=1731059738',
                caption: 'Duchateau Celestio Legno Pixel in American Walnut'
                },
                {
                src: 'https://duchateau.com/wp-content/uploads/2025/10/Toun-2048x1365.jpg',
                caption: 'Duchateau Celestio Legno Toun in American Walnut'
                }
            ]
            },

                    // Paste this inside your brands object:
        'interlam-carved-screens': {
        id: 'interlam-carved-screens',
        categoryId: 'architectural',

        // tile image used on the collections screen
        tileImage: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926759916-Screens-HSPVT-web.jpg?alt=media&token=660ee8f5-f7e2-483f-be9b-9ae555f2359f',

        // brand detail
        name: 'Interlam Carved Screens',
        heroImage: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926759916-Screens-HSPVT-web.jpg?alt=media&token=660ee8f5-f7e2-483f-be9b-9ae555f2359f',
        description:
            '“Screens” are available in core materials that can meet your strictest environmental product requirements while maintaining your unique design intent. All Sustainable Products meet or exceed the most stringent global emission standards and are made with 100% recycled wood fiber, including Post-Consumer Recycled Wood Fiber. Our core materials are third party certified by SCS and EPP, and have been approved by the Collaborative for High Performance Schools by passing the rigorous California Section 01350 testing.',

        // Which feature icons to light up
        features: {
            fireRating: true,
            soundproofing: false,
            mdf: true,
            greenguard: false,
            curvedProfile: false
        },

        // Specs: use null to hide a row, string to show it
        specs: {
            dimensions: '4\' x 8\'',
            thickness: 'Varies by pattern from 3/4" to 3"',
            finish: 'Factory Sanded and Primed, Painted, Custom',
            patternDepth: 'Varies by pattern'
        },

        // Installation methods to show in the “Installation Methods” card
        installMethods: [
            {
            id: 'z-clips',
            label: 'Z-Clips',
            icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d868d996d4d0b794853_hd-azclip-2%201.png'
            },
            {
            id: 'direct-screw',
            label: 'Direct Screw Attachment',
            icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d8602c11b3df898dc1e_image%205.png'
            }
        ],

        // Applications toggles the green/grey pills
        applications: {
            commercial: true,
            residential: true,
            interior: true,
            exterior: false
        },

        // Price card
        pricing: {
            startingAt: null,
            unit: ''
        },

        // Gallery: first 4 become thumbnails; the rest feed the X+ count
        gallery: [
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926776564-Grande-Casino-Custom-2-web.jpg?alt=media&token=0e5b70a4-900a-424e-a8af-71140a59aed7',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926778015-Grande-Casino-Custom-3-web.jpg?alt=media&token=932f9f9a-b708-4edf-9192-944411ef2ab5',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926779494-Grande-Casino-Custom-4-web.jpg?alt=media&token=ba98de24-0434-4b15-88c5-46069075f14d',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926775661-Wavy-2-screen-angled.jpg?alt=media&token=96aab607-29ee-4d57-9c06-a2df46b187c7',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926774181-wavy-2%20screen.jpg?alt=media&token=9198ab60-6061-4b7a-adbf-66a805c54ec2',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926771586-Wave%202%20Screen.jpg?alt=media&token=d66aae59-b95a-4e28-b333-51b78c5e8b5c',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926768930-square-screen-and-tsk001.jpg?alt=media&token=56841238-6707-4949-8236-aee295aca600',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926768207-splat-1601x401.jpg?alt=media&token=3a8dea8e-c49a-4cdc-a022-8d9f81358a0e',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926763526-20160519_091703.jpg?alt=media&token=0c34c6ad-5ef4-4394-9545-2d56134d106f',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926765584-senior-living---lotus%20screen.jpg?alt=media&token=ab6dd867-486e-4f8a-ac8d-9a9ee6ea93a6',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926765977-Shattered.jpg?alt=media&token=ec532268-4485-425e-a403-9fcaad7f40fe',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926764137-screens---pvt-screen-pic2.jpg?alt=media&token=ee87a130-ec7d-4bd7-8b25-b365355b42b3',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926760371-20160519_091650.jpg?alt=media&token=224c4d06-6fad-4f54-a6e8-5b12c0c782fb',
            caption: 'Interlam Carved Screens with Blue ForesCOLOR Core'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926762372-screens---pvt-screen-pic.jpg?alt=media&token=7c2e2dd6-ac38-4915-ab21-3593e65bbf82',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926758065-Screens_Organica%20Max%20Urban.jpg?alt=media&token=d52f2d5a-b74a-4cb7-bb1d-3c47c25d5d46',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926758580-Screens-HSPVT-Screen-web.jpg?alt=media&token=a604de31-70f8-4f43-b656-5a98e9e10f7c',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926761512-Screens---Organica-web3.jpg?alt=media&token=8da0c150-c47e-4074-ae16-d7513141b0b5',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926756682-Screens_Diamond%20Max%20Urban.jpg?alt=media&token=b98d5690-5b79-4a9d-b9a1-33329a809d34',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926757406-Screens_Organica%20Max%20Urban%20Entry.jpg?alt=media&token=e184d984-7707-4b23-ad90-96e504f84144',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926750039-Screens%20-%20Organica%20Screen%20(4).jpg?alt=media&token=7742d7f7-2a1e-451d-9478-620011cb73ce',
            caption: 'Organica Screen installed in ceiling'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926754374-screens%20-%20pvt%20screen%20(8).jpg?alt=media&token=817a3209-3fee-4744-bbf1-bc5589d010d5',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926753633-Screens%20-%20PVT%20Screen%20(2).jpg?alt=media&token=c1620c35-3e5f-48bd-99a4-11086afb989a',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926751726-Screens%20-%20Organica%20Screen%20(5).jpg?alt=media&token=63e33e60-6f01-4743-809a-de2737ecef5a',
            caption: 'Organica Screen installed in ceiling'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926749323-Screens%20-%20Organica%20Screen%20(3).jpg?alt=media&token=eefaed58-3a90-4ba6-8bc2-510570f0fcfa',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926747821-Screens%20-%20Organica%20Screen%20(1).jpg?alt=media&token=174b070e-a78f-4447-b6d0-85b6d3da065a',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926748655-Screens%20-%20Organica%20Screen%20(2).jpg?alt=media&token=3a89f22a-4223-4de4-95cf-18f3a272883f',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926745676-Screens%20-%20HSPVT%20Screen.JPG?alt=media&token=26d7cdb0-b9f1-483f-bb3a-f25bf655f963',
            caption: 'PVT Screen installed in ceiling'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926743749-Rebeccas%20Cafe-Burlington4.jpg?alt=media&token=f26b2e54-9bdd-44ec-b148-7a066bad5bfd',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926741692-Rebeccas%20Cafe-Burlington2.jpg?alt=media&token=0c8cefd4-e65f-462d-a9a9-e7d1f4a432b8',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926741015-pvt%20screen-carved-wall-panel-divider-008.jpg?alt=media&token=67fab248-2092-4a3a-a192-dcf7b029646a',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926726864-offset-eight-side.jpg?alt=media&token=c764dcfc-d6ab-47b9-8831-bda5aab88426',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926725414-Lotus%20Screen..jpg?alt=media&token=bb8c0f11-960e-4cd1-868a-d6c8d6bcf8db',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926722818-light.jpg?alt=media&token=2a21b939-168b-4ab0-9972-1f11f7104777',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926719957-Junction%20Flats%20-%20MN%20-%20HSPVT%202.jpg?alt=media&token=279936b0-02a8-41bb-affd-0b31ad589737',
            caption: 'HSPVT Screen installed in ceiling'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926718367-iu-neurology-center-organica-screen-3.jpg?alt=media&token=2a9a4568-0588-494d-a179-5d99bfd7cedb',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926717646-Interlam%20Circle%20Screens.jpg?alt=media&token=8fc321ec-a483-46c5-965d-9b3fea56a9a0',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926719062-iu-neurology-center-organica-screen-5.jpg?alt=media&token=5f3216a3-3b1f-45ed-bebf-ef3584129785',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926713642-hspvt%20screen-carved-wall-panel-divider-005.jpg?alt=media&token=5b8dbf03-aa6d-4d0e-a103-477bd0588b12',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926715140-hspvt%20screen-carved-wall-panel-divider-008.jpg?alt=media&token=98db08a6-dff4-4b87-a151-859b5cc3c379',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926716797-hspvt-screen-carved-wall-panel-divider-009.jpg?alt=media&token=fbab1bba-9ecf-4b7a-8476-17a202c183db',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926709664-Hex%202.jpg?alt=media&token=3a9cceff-13f5-4c82-871d-56c9549cc6e5',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926707508-full_pvt-screen-carved-wall-panel-divider-004.jpg?alt=media&token=74dba7eb-35d4-44ef-8cf9-da649884f81c',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926704958-Daisy%20Screen.jpg?alt=media&token=6e7b2a9a-81fc-4be4-8d54-85098f48d807',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926705387-flow-screen-with-Copper-met.jpg?alt=media&token=639ed7aa-5a38-4c28-82fb-9b8324323d9f',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926701955-circuit%203%20screen-carved-wall-panel-divider-003.jpg?alt=media&token=8a98a483-12a4-4d6e-a547-ed39c3431036',
            caption: 'Interlam Carved Screens'
            },
            {
            src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926700734-cat%20screen.jpg?alt=media&token=c051f948-887c-40ed-96c3-526b3783f5fa',
            caption: 'Interlam Carved Screens'
            }
        ]
        }
    }
};
</script>