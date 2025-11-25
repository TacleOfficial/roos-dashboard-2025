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
          'duchateau-ligne',
          'duchateau-celestio-legno',
          'interlam-carved-screens',
          'interlam-metal-screens'
  
          // add other architectural brands here later
        ]
      },
      acoustical: {
        id: 'acoustical',
        name: 'Acoustical Solutions',
        collections: [
          'akupanels',
          'akutile',
          'akupanel-profile-wrap',
          'duchateau-ligne-shadow',
          'duchateau-zen',
          'ezobord',
          'resonance'
          // add other architectural brands here later
        ]
      },
      laminates: {
        id: 'laminates',
        name: 'Laminates & Veneers',
        collections: [
          'lab-designs',
          'ati-decorative-laminates',
          'barnwood',
          'decotone-surfaces',
          'ecodomo'
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
          'texturglas'
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
      },
      // Paste this inside your brands object:
    'interlam-metal-screens': {
      id: 'interlam-metal-screens',
      categoryId: 'architectural',

      // tile image used on the collections screen
      tileImage: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926786020-Mitsch%20Design%20-%20Metal%20Screens%20ILMS026.jpg?alt=media&token=b7c85918-671e-400a-81de-9123d23d6456',

      // brand detail
      name: 'Interlam Metal Screens',
      heroImage: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926786020-Mitsch%20Design%20-%20Metal%20Screens%20ILMS026.jpg?alt=media&token=b7c85918-671e-400a-81de-9123d23d6456',
      description:
        'Metal Screens are made of mild steel that is laser cut with precision to create some very unique patterns. Once cut, a powder coat is applied to each screen to give the panel a clean, finished look. Our screens will be available in 10 gauge (.1406” or about 3mm) thickness and in standard 4x8’s or possibly 4x10’s. Each screen will weigh anywhere from 30 lbs up to 120 lbs depending on the design. Custom screens are definitely a possibility, however, we ask that you have an autocad file available and exact sizes needed in order for us to get a price. Pricing custom screens may take up to 4-5 business days.',

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
        exterior: true
      },

      // Price card
      pricing: {
        startingAt: null,
        unit: ''
      },

      // Gallery: first 4 become thumbnails; the rest feed the X+ count
      gallery: [
        {
          src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/645bbe5ee39860e596da4dcb_20180308_133813-1-e1568898182302.jpg',
          caption: 'Interlam Metal Screens'
        },
        {
          src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/645bdfa8e79709d646325cc3_SpaceAsArt-InteriorDesign_PWMG-32-1024x682.jpg',
          caption: 'Interlam Metal Screens'
        },
        {
          src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/645bde90eaea54309c7cd36d_Terra-Gaucha-bar-1024x659.jpg',
          caption: 'Interlam Metal Screens'
        },
        {
          src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/645bde99ee38923b2f9291c7_Terra-Gaucha-dining-screen-vignette-1024x644.jpg',
          caption: 'Interlam Metal Screens'
        },
        {
          src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643ee23d2813590c61d49baf_Terra-Gaucha-Bar-to-Dining-final-1024x631.jpg',
          caption: 'Interlam Metal Screens'
        },
        {
          src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64b01d591cbddba223627727_www.interlam-design.jpg',
          caption: 'Interlam Metal Screens'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926786728-Screenshot_1.jpg?alt=media&token=5e683040-986f-448c-90b8-2b8008093173',
          caption: 'Interlam Metal Screens'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926786020-Mitsch%20Design%20-%20Metal%20Screens%20ILMS026.jpg?alt=media&token=b7c85918-671e-400a-81de-9123d23d6456',
          caption: 'Interlam Metal Screens'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926785226-img_6585951x634.jpg?alt=media&token=6c33b3f9-f038-41d2-abd8-cbc769ba488e',
          caption: 'Interlam Metal Screens'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926784483-img_6592-crop-u254395.jpg?alt=media&token=0c6b5742-cd7f-420a-be4c-f2e405c05040',
          caption: 'Interlam Metal Screens'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926783797-img_6590-crop-u254355.jpg?alt=media&token=a01a8007-7bcd-46fa-9c89-80a705634578',
          caption: 'Interlam Metal Screens'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/roos-international-invent-2025.firebasestorage.app/o/media%2FInterlam%2F1761926772026-20160519_091906%20(1).jpg?alt=media&token=48d7e1f3-236b-4813-b581-792614197063',
          caption: 'Interlam Metal Screens'
        }
      ]
    },

    'duchateau-ligne': {
  id: 'duchateau-ligne',
  categoryId: 'architectural',

  // tile image used on the collections screen
  tileImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/67ae1bbe580444b714624876_65986ee3e5c7559a6c210445_2.png',

  // brand detail
  name: 'Duchateau Ligne',
  heroImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/67ae1bbe580444b714624876_65986ee3e5c7559a6c210445_2.png',
  description:
    'Born from the simple beauty where line and air meet. Where the harmony of illumination and darkness enhance nature’s expression through exceptional design. Light and shadow move in a silent rhythm across the openings between wood pieces, where the endless pursuit of perfection has discovered just as much to be told in the negative space. Intentional in its entirety, the material is finished on all sides, creating a presence that can be felt in spaces intimate or grand—a refined architecture that fills its surrounding spaces with life.',

  // Which feature icons to light up
  features: {
    fireRating: true,
    soundproofing: true,
    mdf: false,
    greenguard: false,
    curvedProfile: false
  },

  // Specs: use null to hide a row, string to show it
  specs: {
    dimensions: '14-3/4″ x 119″',
    thickness: '1-5/8”',
    finish: 'Oak, Walnut',
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
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/67ae1bbe580444b714624876_65986ee3e5c7559a6c210445_2.png',
      caption: 'Duchateau Ligne Oak'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/67ae1bc334dc7d4c07d6a404_659c1f677729c1d1dfbc3e7c_Oak%20(7).png',
      caption: 'Duchateau Ligne Oak'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/67ae1bcedbb712458b4e9094_65986ee3c0cbaca10f49db25_4.png',
      caption: 'Duchateau Ligne Walnut'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/67ae1bd8c3cd69ec2c64cb7e_659c1f69bc11593fca9a6a5c_Walnut.png',
      caption: 'Duchateau Ligne Walnut'
    }
  ]
},

// Paste this inside your brands object:
'akupanels': {
  id: 'akupanels',
  categoryId: 'acoustical',

  // tile image used on the collections screen
  tileImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6447dc633a06f2a38d300280_acousticalartconcepts.jpg',

  // brand detail
  name: 'Acoustical Arts Akupanel',
  heroImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6447dc633a06f2a38d300280_acousticalartconcepts.jpg',
  description:
    'Fifteen slats backed with a Resonance Acoustic panel and faced with a beautiful wood veneer (shown below). Now available in any high pressure laminate from Lab Designs and any phenolic backed metal laminate from Specified Metals.',

  // Which feature icons to light up
  features: {
    fireRating: true,
    soundproofing: true,
    mdf: true,
    greenguard: false,
    curvedProfile: true
  },

  // Specs: use null to hide a row, string to show it
  specs: {
    dimensions: '23 5/8” x 94 ½”',
    thickness: '13/16”',
    finish: 'Smoked Oak, Brown Oak, Natural Oak, Grey Oak, Walnut, Recon Grey, Recon Maple, Smoked Oak, Brown Oak, Black Ash & Classic Oak',
    patternDepth: 'N/A'
  },

  // Installation methods to show in the “Installation Methods” card
  installMethods: [
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
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6447dc633a06f2a38d300280_acousticalartconcepts.jpg',
      caption: 'Akupanel in Natural Oak'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6447dbfed487df2253df539b_acousticalartconcepts.jpg',
      caption: 'Akupanel in Natural Oak'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6447dc05557b2e5338bf3c62_acousticalartconcepts.jpg',
      caption: 'Akupanel in Grey Oak'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6447dc0f501fe483eab53133_acousticalartconcepts.jpg',
      caption: 'Akupanel in Natural Oak'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6447dc4b501fe44fa2b533e1_acousticalartconcepts.jpg',
      caption: 'Akupanel in Natural Oak'
    },
    {
      src: 'https://woodupp.b-cdn.net/approved/18302207650094545.jpg',
      caption: 'Akupanel in Carolina Oak'
    },
    {
      src: 'https://woodupp.b-cdn.net/approved/18230573797170914.jpg',
      caption: 'Akupanel in Carolina Oak'
    },
    {
      src: 'https://woodupp.b-cdn.net/approved/17970852662300262.jpg',
      caption: 'Akupanel in Solid Blue'
    },
    {
      src: 'https://woodupp.b-cdn.net/approved/17887435352892301.jpg',
      caption: 'Akupanel in with Lamela Strip'
    },
    {
      src: 'https://woodupp.b-cdn.net/approved/17951696231608643.jpg',
      caption: 'Akupanel in Clay color'
    },
    {
      src: 'https://woodupp.b-cdn.net/approved/18216166528210764.jpg',
      caption: 'Akupanel in Walnut Oak'
    },
    {
      src: 'https://woodupp.b-cdn.net/approved/17922766226356583.jpg',
      caption: 'Akupanel in Smoked Oak with LED Accessory'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/688d1871dd1f0879e065f33b_Akupanel%20Curve%20Profile%20Install%202.png',
      caption: 'Akupanel with curved profile'
    }
  ]
},
// Paste this inside your brands object:
'duchateau-ligne-shadow': {
  id: 'duchateau-ligne-shadow',
  categoryId: 'acoustical',

  // tile image used on the collections screen
  tileImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/660d64e8add6dd1df2ab13e0_OAK-SHADOW.webp',

  // brand detail
  name: 'Duchateau Ligne Shadow',
  heroImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/660d64e8add6dd1df2ab13e0_OAK-SHADOW.webp',
  description:
    'Born from the simple beauty where line and air meet. Where the harmony of illumination and darkness enhance nature’s expression through exceptional design. Light and shadow move in a silent rhythm across the openings between wood pieces, where the endless pursuit of perfection has discovered just as much to be told in the negative space. Intentional in its entirety, the material is finished on all sides, creating a presence that can be felt in spaces intimate or grand—a refined architecture that fills its surrounding spaces with life.',

  // Which feature icons to light up
  features: {
    fireRating: false,
    soundproofing: true,
    mdf: false,
    greenguard: false,
    curvedProfile: false
  },

  // Specs: use null to hide a row, string to show it
  specs: {
    dimensions: '14-3/4” x 119 ½”',
    thickness: '1-5/8"',
    finish: 'Sand, American Walnut',
    patternDepth: 'N/A'
  },

  // Installation methods to show in the “Installation Methods” card
  installMethods: [
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
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/67ae1bbc28fd6204a615e2ab_65987b6c55ab821f5687c9fe_Untitled%20design%20(1).png',
      caption: 'Duchateau Ligne with Acoustic felt'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/67ae1bc56285ccbb3720322c_659c1f689df3bc1bed051e94_Walnut%20Shadow%20(3).png',
      caption: 'Duchateau Ligne with Acoustic felt'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/67ae1bcc675e2f000eff0d54_659c1f68f6dc43cf7f1a8faa_Walnut%20Shadow%20(2).png',
      caption: 'Duchateau Ligne with Acoustic felt'
    }
  ]
},
// Paste this inside your brands object:
'duchateau-zen': {
  id: 'duchateau-zen',
  categoryId: 'acoustical',

  // tile image used on the collections screen
  tileImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/65b7d170020d132cfcb6a96d_Intervals_Natural-768x576.webp',

  // brand detail
  name: 'Duchateau Zen',
  heroImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/65b7d170020d132cfcb6a96d_Intervals_Natural-768x576.webp',
  description:
    'The Zen Collection offers exceptional beauty. Lacquer finished veneers express wood visuals in five colors, with a felt backing that insulates sound and deepens the contrast. Sophisticated, yet warm—acoustically sound for upscale hospitality. Scalable in size—a powerful statement accent in the home.',

  // Which feature icons to light up
  features: {
    fireRating: true,
    soundproofing: true,
    mdf: false,
    greenguard: false,
    curvedProfile: false
  },

  // Specs: use null to hide a row, string to show it
  specs: {
    dimensions: '15-1/8" x 108"',
    thickness: '15/16"',
    finish: 'Natural Oak, Raw Walnut',
    patternDepth: 'N/A'
  },

  // Installation methods to show in the “Installation Methods” card
  installMethods: [
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
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/65b7d170020d132cfcb6a96d_Intervals_Natural-768x576.webp',
      caption: 'Duchateau Zen in Natural Oak'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/65b1594ffb388c25512dc70f_Svrfaced-Intervals-Natural-Side.webp',
      caption: 'Duchateau Zen in Natural Oak'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/65b159768db4f8786eb279b7_Web-Intervals-Natural-Restaurant-1.webp',
      caption: 'Duchateau Zen in Natural Oak'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/65b15a130dbd6a844128d6e5_Svrfaced-Intervals-Walnut-Side.webp',
      caption: 'Duchateau Zen in Raw Walnut'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/65b15a2597166a2b15a61e22_Intervals-Raw-Walnut.webp',
      caption: 'Duchateau Zen in Raw Walnut'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/65b15cb0ceab58a41e704fbd_Web-Intervals-Darkened-Walnut-Home-Theater.webp',
      caption: 'Duchateau Zen in Raw Walnut'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/65b7d23a4a2e37bd916725ce_Intervals-Darkened-Walnut-Bedroom.webp',
      caption: 'Duchateau Zen in Raw Walnut'
    }
  ]
},
// Paste this inside your brands object:
'ezobord': {
  id: 'ezobord',
  categoryId: 'acoustical',

  // tile image used on the collections screen
  tileImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6453f4736d7484ab09fb8cbb_ezobord-custom-gallery6.webp',

  // brand detail
  name: 'Ezobord',
  heroImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6453f4736d7484ab09fb8cbb_ezobord-custom-gallery6.webp',
  description:
    'The Zen Collection offers exceptional beauty. Lacquer finished veneers express wood visuals in five colors, with a felt backing that insulates sound and deepens the contrast. Sophisticated, yet warm—acoustically sound for upscale hospitality. Scalable in size—a powerful statement accent in the home.',

  // Which feature icons to light up
  features: {
    fireRating: true,
    soundproofing: true,
    mdf: false,
    greenguard: false,
    curvedProfile: false
  },

  // Specs: use null to hide a row, string to show it
  specs: {
    dimensions: 'Varies by design',
    thickness: '0.8mm',
    finish: 'PET',
    patternDepth: 'Varies by design'
  },

  // Installation methods to show in the “Installation Methods” card
  installMethods: [
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
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6453f591f1f236fee87d83cc_acoustical-net_01.jpg',
      caption: 'Ezobord Acoustical Net'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64b82d24851cb53285c61f8b_amplitude_01.jpg',
      caption: 'Ezobord Amplitude'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64b83168d7323bdde9dbbea2_ceiling-baffles_02-1.jpg',
      caption: 'Ezobord Baffle Cloud'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64ac5bab18310a88dfb13024_balsa_01.jpg',
      caption: 'Ezobord Digital PET Acoustic Slat Panels'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64ac5be9187df48f87cca4c6_WhatsApp-Image-2022-12-13-at-08.13.24.jpg',
      caption: 'Ezobord Carved Panels'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64b835b9455979440d9899aa_ceiling-baffles_02.jpg',
      caption: 'Ezobord Ceiling Baffles'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64ac5c175f425c837ba1c2f0_ezobord-ezo-on-ezo-gallery5.webp',
      caption: 'Ezobord Ezo on Ezo'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64ac5c6f1b0ca70cb1a0da67_full-sheet_01.jpg',
      caption: 'Ezobord Full Panels'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64b837c997c120b90d806d18_full-sheet-cloud-1.jpg',
      caption: 'Ezobord Full Sheet Cloud'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64ac5c35f167079227121312_ezobord-geo-tiles-enhanced-gallery2.webp',
      caption: 'Ezobord Geo Tile'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64ac5cdb289ad134d7c2ee61_ezobord-work-zone-design-1000-7.jpg',
      caption: 'Ezobord Dividers and Partitions'
    }
  ]
},

// Paste this inside your brands object:
'resonance': {
  id: 'resonance',
  categoryId: 'acoustical',

  // tile image used on the collections screen
  tileImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643d6497320d821320f77212_acousticalartconcepts.jpg',

  // brand detail
  name: 'Resonance',
  heroImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643d6497320d821320f77212_acousticalartconcepts.jpg',
  description:
    'Resonance Panels are an ideal sound-absorbing decorative material. The raw material is 100% polyester fiber, made out of 50% recycled plastic water bottles. The composition makes it sound-absorbing, fire-resistant, insulating, moisture-proof, anti-mildew, easy cleaning, easy cutting, simple installation, and ECO friendly. These panels can be mounted using basic construction methods such as directly screwing or gluing them into the wall or using our optional accessories. A 9mm single panel weighs about 4kg or 9lbs and has a soft texture. It is an ideal material for decoration. The standard panel is formed by hot-pressing (colored) PET fiber to produce 9mm sheets of various color choices. The unique properties of this non-woven fabric give it a non-directional texture with uniform color throughout the panel. High wearing edges add to the durability of this product but remain easy to cut into any shape. Currently we have 13 standard stock colors.',

  // Which feature icons to light up
  features: {
    fireRating: true,
    soundproofing: true,
    mdf: false,
    greenguard: false,
    curvedProfile: false
  },

  // Specs: use null to hide a row, string to show it
  specs: {
    dimensions: 'Varies by design, standard 4\' x 8\'',
    thickness: '0.8mm',
    finish: 'Black, White, Red, Yellow, Charcoal, Marble Gray, Royal Blue and more',
    patternDepth: 'Varies by design'
  },

  // Installation methods to show in the “Installation Methods” card
  installMethods: [
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
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/67f68b58e452ab54b95e9a11_Resonance%20Art%20Colors.png',
      caption: 'Resonance Panels available in 14 colors'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/644831bd30912e1875a379bf_acousticalartconcepts.jpg',
      caption: 'Resonance in Royal Blue'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643d6453af384d7229b3ba5e_acousticalartconcepts.jpg',
      caption: 'Resonance Baffles'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643d6476af384d51d1b3bba6_acousticalartconcepts.jpg',
      caption: 'Resonance Embossed Panels'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643d6497320d821320f77212_acousticalartconcepts.jpg',
      caption: 'Resonance Inlay with ForesCOLOR substrate'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64af08a95adc8c7db9036722_acousticalartconcepts.jpg',
      caption: 'Resonance One and Two allows for more than one PET overlay to create multiple designs'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643d64e0f1f4a77783d6b822_acousticalartconcepts.jpg',
      caption: 'Resonance Screens and Dividers'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643d6512dc4aafd2d36f5679_acousticalartconcepts.jpg',
      caption: 'Resonance V-Carved'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64ad9f51399c725e127887a0_carved-planks-768x1024.jpg',
      caption: 'Resonance planks can be digitally printed to mimic real wood'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64ad9f3b1a1082b685e0e4fe_Untitled-design-28-1-1024x320.png',
      caption: 'Resonance Digital Planks installed a restaurant'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64ad9f00da5417d65daa159c_AAC-dig-wood-A-rotated.jpg',
      caption: 'Resonance Digital Planks installed in another restaurant'
    }
  ]
},
// Paste this inside your brands object:
'akutile': {
  id: 'akutile',
  categoryId: 'acoustical',

  // tile image used on the collections screen
  tileImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643d5f8700ed0eb634408ec9_acousticalartconcepts.png',

  // brand detail
  name: 'Akutile',
  heroImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643d5f8700ed0eb634408ec9_acousticalartconcepts.png',
  description:
    'Slats backed with a Resonance Acoustic panel and faced with a beautiful wood veneer (shown below) or any high pressure laminate from Lab Designs Laminates, or any phenolic backed metal laminate from Specified Metals. ​The same veneer that is on the face of the Akupanel can be sold separately to highlight your design',

  // Which feature icons to light up
  features: {
    fireRating: true,
    soundproofing: true,
    mdf: false,
    greenguard: false,
    curvedProfile: false
  },

  // Specs: use null to hide a row, string to show it
  specs: {
    dimensions: '23 5/8” x 23 5/8”',
    thickness: '13/16”',
    finish: 'Varies by design',
    patternDepth: 'Varies by design'
  },

  // Installation methods to show in the “Installation Methods” card
  installMethods: [
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
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64481f78b3a168af662e6e42_acousticalartconcepts.png',
      caption: 'Akutile installed on a wall'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64481f9be4a0fa43cf7fc235_acousticalartconcepts.png',
      caption: 'Akutile installed on a wall'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64481f9d81d46922c4f99b95_acousticalartconcepts.png',
      caption: 'Akutile installed in the ceiling'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64481fa0a0243d6f85bf75b1_acousticalartconcepts.png',
      caption: 'Akutile installed in the ceiling'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64481fa7a0d34613f74a7b11_acousticalartconcepts.png',
      caption: 'Akutile installed in the ceiling'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6448224d5ce790378ae3292c_Untitled%20design%20(74).png',
      caption: 'Akutile installed in the ceiling'
    }
  ]
},
// Paste this inside your brands object:
'akupanel-profile-wrap': {
  id: 'akupanel-profile-wrap',
  categoryId: 'acoustical',

  // tile image used on the collections screen
  tileImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6475fc33cb9c620585072a32_acousticalartconcepts.png',

  // brand detail
  name: 'Akupanel Profile Wrap',
  heroImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6475fc33cb9c620585072a32_acousticalartconcepts.png',
  description:
    'Slats backed with a Resonance Acoustic panel and faced with a beautiful wood veneer (shown below) or any high pressure laminate from Lab Designs Laminates, or any phenolic backed metal laminate from Specified Metals. ​The same veneer that is on the face of the Akupanel can be sold separately to highlight your design',

  // Which feature icons to light up
  features: {
    fireRating: true,
    soundproofing: true,
    mdf: true,
    greenguard: false,
    curvedProfile: true
  },

  // Specs: use null to hide a row, string to show it
  specs: {
    dimensions: '23 5/8” x 23 5/8”',
    thickness: '13/16”',
    finish: 'Varies by design',
    patternDepth: 'Varies by design'
  },

  // Installation methods to show in the “Installation Methods” card
  installMethods: [
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
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6447dc53e1b85e1b48d383dc_acousticalartconcepts.jpg',
      caption: 'Profile wrap on a wall'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6475fc2650d16565dff00881_acousticalartconcepts.png',
      caption: 'Profile wrap close up'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6475fc19c4af5d1aee52ed00_acousticalartconcepts.png',
      caption: 'Profile wrap close up'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6475fc2bd6f2b7af32272651_acousticalartconcepts.png',
      caption: 'Profile wrap close up'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6475fc2eb2faf2b595e750e1_acousticalartconcepts.png',
      caption: 'Profile wrap close up'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6475fc3150d16565dff018d7_acousticalartconcepts.png',
      caption: 'Profile wrap close up'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6475fc33cb9c620585072a32_acousticalartconcepts.png',
      caption: 'Profile wrap close up'
    }
  ]
},
// Paste this inside your brands object:
'lab-designs': {
  id: 'lab-designs',
  categoryId: 'laminates',

  // tile image used on the collections screen
  tileImage: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/65ce86c7844611f613adb20a_1.18%20Just%20Bars%20-%20Blue%20Oxygen%20Collection%202.jpg',

  // brand detail
  name: 'Lab Designs',
  heroImage: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/65ce86c7844611f613adb20a_1.18%20Just%20Bars%20-%20Blue%20Oxygen%20Collection%202.jpg',
  description:
    'Lab Designs Laminates is designed to inspire, with finishes that bring your spaces to life. can be sold separately to highlight your design, premium laminates without the Premium Price, 9 collections and over 600 laminates and can be IMO certified.',

  // Which feature icons to light up
  features: {
    fireRating: true,
    soundproofing: false,
    mdf: false,
    greenguard: true,
    curvedProfile: false
  },

  // Specs: use null to hide a row, string to show it
  specs: {
    dimensions: '48" x 96"',
    thickness: '0.9mm',
    finish: 'Varies by design',
    patternDepth: 'Varies by design'
  },

  // Installation methods to show in the “Installation Methods” card
  installMethods: [
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
      src: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/689a15d7dd2ecd8d8f9decc4_DP134.png',
      caption: 'Lab Designs Laminates'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/68f11a9f0451f6b5fdf761b5_2.png',
      caption: 'Lab Designs Laminates'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/689a15d6b71b9dd18383295c_DW093.png',
      caption: 'Lab Designs Laminates'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/689a297c600aca845113c1fc_WO030.png',
      caption: 'Lab Designs Laminates'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/689a15d5a0e90957e17fa614_DP762%20(3).png',
      caption: 'Lab Designs Laminates'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/65ce86c7844611f613adb20a_1.18%20Just%20Bars%20-%20Blue%20Oxygen%20Collection%202.jpg',
      caption: 'Lab Designs Laminates'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/689a36e88483aec1db65c0a7_SC420.png',
      caption: 'Lab Designs Laminates'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/689b654203db959f24ab319c_Lab%20Designs%20Eclipse%20Series.jpg',
      caption: 'Lab Designs Laminates'
    }
  ]
},
// Paste this inside your brands object:
'ati-decorative-laminates': {
  id: 'ati-decorative-laminates',
  categoryId: 'laminates',

  // tile image used on the collections screen
  tileImage: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/6759c88e8774db6d529ed7dc_65c645734734fa3a52371909_Living-Room_Ariel-Washed-Oak_MirroFlex_1100px.jpg',

  // brand detail
  name: 'ATI Decorative Laminates',
  heroImage: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/6759c88e8774db6d529ed7dc_65c645734734fa3a52371909_Living-Room_Ariel-Washed-Oak_MirroFlex_1100px.jpg',
  description:
    'ATI Decorative Surfaces is a family-owned and operated manufacturing facility focused on developing innovative surfaces for the contract, hospitality, and retail markets. We strive to be a solutions provider with products and services that resolve the challenges for the A&D community. From specialized manufacturing methods to in-house CAD and graphic designers, ATI offers amazing adaptation capacity to meet and exceed our client’s needs. Our team manages your entire project from concept through completion.',

  // Which feature icons to light up
  features: {
    fireRating: true,
    soundproofing: false,
    mdf: false,
    greenguard: true,
    curvedProfile: false
  },

  // Specs: use null to hide a row, string to show it
  specs: {
    dimensions: '48" x 96" or 48" x 120"',
    thickness: 'Varies by design',
    finish: 'Varies by design',
    patternDepth: 'Varies by design'
  },

  // Installation methods to show in the “Installation Methods” card
  installMethods: [
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
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/65c638d90afadaa9737d972e_MirroFlex_Japanese-Weave-Crosshatch-Silver_Modern-Office-1-p-2000.jpg',
      caption: 'MirroFlex panels'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/65d7b3dfa60c409c72742c86_Retail_NuMetal-Rose-Gold-212_1100px.jpg',
      caption: 'NuMetal Laminates'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/65c68fbae357a4684858c988_FUS-TEX-MET_BULLETPROOF-AND-SO-IMPRESSED.jpg',
      caption: 'Fusion Textured Metal can combine digital images to NuMetal laminates'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/65e7546416fb0cdd2215fb5b_GINKGO-LUMISPLASH-SALES-COUNTER.jpg',
      caption: 'LumiSplash allows for custom printing with Decorative Laminates that includes LED Edge Lighting'
    }
  ]
},

// Paste this inside your brands object:
'barnwood': {
  id: 'barnwood',
  categoryId: 'laminates',

  // tile image used on the collections screen
  tileImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643e8e2f7e656b727129edc7_www.interlam-design.jpg',

  // brand detail
  name: 'Barnwood Veneers',
  heroImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643e8e2f7e656b727129edc7_www.interlam-design.jpg',
  description:
    'Looking for a reclaimed wood look without the reclaimed wood price? The Barnwood real wood veneer series is a great alternative to the heft and the cost of solid pieces of reclaimed wood. Barnwood has the same texture, knots, and natural markings as the real thing because it is the real thing (just a very thin slice). Sheet size: 4\' x 8\'. Fleece backed.',

  // Which feature icons to light up
  features: {
    fireRating: true,
    soundproofing: false,
    mdf: false,
    greenguard: true,
    curvedProfile: false
  },

  // Specs: use null to hide a row, string to show it
  specs: {
    dimensions: '48" x 96"',
    thickness: '1mm',
    finish: 'Varies by design, pre-sanded',
    patternDepth: 'Varies by design'
  },

  // Installation methods to show in the “Installation Methods” card
  installMethods: [
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
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64a8579d843c06fc438fec24_Smokey-Oak-3.jpg',
      caption: 'Barnwood Veneers'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643e9c6405988e9fbccc80ad_www.interlam-design.jpg',
      caption: 'Barnwood Veneers'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643e9c738c053731e2449bbb_www.interlam-design.jpg',
      caption: 'Barnwood Veneers'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64a8607040e6e9c6a12b5600_barnwood2-cs-1024x790.jpg',
      caption: 'Barnwood Veneers'
    }
  ]
},
// Paste this inside your brands object:
'decotone-surfaces': {
  id: 'decotone-surfaces',
  categoryId: 'laminates',

  // tile image used on the collections screen
  tileImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643ef301f91b375d89bb3e55_Torino%20TC2827.jpg',

  // brand detail
  name: 'Decotone Surfaces',
  heroImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643ef301f91b375d89bb3e55_Torino%20TC2827.jpg',
  description:
    'A constant evolution of finishes, textures, colors and wood grains developed with a firm eye on market trends to offer innovative design possibilities. Decotone Surfaces features solid colors, pearlescent patterns, beautiful wood grains, artistic and traditional metal laminates. These laminates also have a high resistance to scratches, abrasions and scuffs, making it perfect for high traffic areas.',

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
    dimensions: '48" x 96" or 48" x 120"',
    thickness: '.9mm',
    finish: 'Varies by design',
    patternDepth: 'Varies by design'
  },

  // Installation methods to show in the “Installation Methods” card
  installMethods: [
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
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643ef3452a538a9658c9cfb4_Designer%20Laminates%20d-0808rw.jpg',
      caption: 'Decotone Surfaces'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643ef417a6800bf3ec1ea0a1_Lamitech%20italian%20walnut%20lt-1513.jpg',
      caption: 'Decotone Surfaces'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643ef54f99b6cdeb999258f0_Petrified%20Grey%20LT-3129.jpg',
      caption: 'Decotone Surfaces'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643ef5515e1032cfb4776319_MET-a748%20Metallic.jpg',
      caption: 'Decotone Surfaces'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643ef55228135947fed5fa9a_MET-a718%20Palm%20Leaf%20Bronz.jpg',
      caption: 'Decotone Surfaces'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643ef554b0eb6311d8f53222_MET-A716.jpg',
      caption: 'Decotone Surfaces'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/643ef570dd2d9212e8394c66_D-1022HG%20Copper.jpg',
      caption: 'Decotone Surfaces'
    }
  ]
},

// Paste this inside your brands object:
'ecodomo': {
  id: 'ecodomo',
  categoryId: 'laminates',

  // tile image used on the collections screen
  tileImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/685191209ac4141b8c6c26cb_Ecodomo%20White%20Shagreen%20Stratto%20RLV.png',

  // brand detail
  name: 'Ecodomo',
  heroImage: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/685191209ac4141b8c6c26cb_Ecodomo%20White%20Shagreen%20Stratto%20RLV.png',
  description:
    'Ecodomo’s Andeline Recycled Leather Veneer – RLV™ – is available in industry standard 4×8 sheet for ease of integration in manufacturing. It is also available laminated on 4mm panels – the same thickness as glass. You can design and manufacture with confidence with EcoDomo RLV™ to integrate leather on cabinet doors, furniture inserts, and vanities from commercial to residential. A vast majority value, connect with and simply love leather for their cars, personal accessories, or furniture. EcoDomo panels can also be made acoustical!',

  // Which feature icons to light up
  features: {
    fireRating: true,
    soundproofing: true,
    mdf: false,
    greenguard: false,
    curvedProfile: false
  },

  // Specs: use null to hide a row, string to show it
  specs: {
    dimensions: '48" x 96"',
    thickness: '4mm',
    finish: 'Varies by design',
    patternDepth: 'Varies by design'
  },

  // Installation methods to show in the “Installation Methods” card
  installMethods: [
    {
      id: 'construction-adhesive',
      label: 'Construction Adhesive',
      icon: 'https://cdn.prod.website-files.com/6384dfcf53b8233ce7ee1be4/691f5d86fd168ec4433c74a8_Liquid-Nails%201.png'
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
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/68519135c56fb113f6502604_Modern%20Kitchen%20with%20Brass%20Accents%20Stratto%20Peel%20and%20Stick.png',
      caption: 'Ecodomo Leather Veneers'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6851911d2f78b69ae5746d84_Ecodomo%20Pebble%20Shagreen%20Stratto%20RLV.png',
      caption: 'Ecodomo Leather Veneers in Pebble Shagreen'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64c1391043eebc7f8589be0b_EcoDomo-LanthamWatkins-Staircase-Platform-Wide-.webp',
      caption: 'Ecodomo can be used for flooring in commercial and residential areas of high traffic'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64ac30822d61ed5ee6e5b47f_Untitled%20design%20-%202023-07-10T121905.016.png',
      caption: 'Distinctive and unique leather belt panels, each and every time. These charming belt panels  are guaranteed eye-catchers.'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64469c3c1d3cc2cbb2acf959_EcoDomo-Leather-Belt-Drawer-Fronts_60.jpg',
      caption: 'Distinctive and unique leather belt panels, each and every time. These charming belt panels  are guaranteed eye-catchers.'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/64469c02766243d8107c06ba_IMG_0582_5812-1024x557.jpg',
      caption: 'Distinctive and unique leather belt panels, each and every time. These charming belt panels  are guaranteed eye-catchers.'
    },
    {
      src: 'https://cdn.prod.website-files.com/6384ed8d758eccd2bf818356/6851906d0da4efca2594c096_Ecodomo%20Stratto%20RLV%20Shagreen.png',
      caption: 'Stratto RLV: Peel & Stick Recycled Leather Veneers'
    }
  ]
}

    }
};
