export default {
  name: 'artikel',
  title: 'Artikel',
  type: 'document',
  fields: [
    { name: 'judulArtikel', title: 'Judul Artikel', type: 'string' },
    { 
      name: 'slug', 
      title: 'Slug', 
      type: 'slug', 
      options: { 
        source: 'judulArtikel', 
        maxLength: 96 
      } 
    },
    { 
  name: 'konten', 
  title: 'Konten', 
  type: 'array', 
  of: [
    { type: 'block' } // Ini yang memungkinkan kamu Bold, Italic, dan Poin-poin
  ] 
},
    { name: 'gambar', title: 'Gambar', type: 'image' },
    { 
      name: 'category', 
      title: 'Kategori', 
      type: 'string',
      options: {
        list: [
          { title: 'Hukum Konstitusi & Kebijakan', value: 'hukum konstitusi & kebijakan' },
          { title: 'Hukum Bisnis & Agraria', value: 'hukum bisnis & agraria' },
          { title: 'Litigasi & Advokasi', value: 'litigasi & advokasi' }
        ],
        layout: 'dropdown' // Membuatnya menjadi menu pilihan
      }
    },
    { name: 'date', title: 'Tanggal', type: 'string' },
    { name: 'author', title: 'Penulis', type: 'string' },
    { name: 'url', title: 'Link URL', type: 'url' },
  ],
}