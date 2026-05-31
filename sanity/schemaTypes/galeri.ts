import { defineField, defineType } from 'sanity';

export const galeriType = defineType({
  name: 'galeri',
  title: 'Galeri Kegiatan',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Dokumentasi Kegiatan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori Kegiatan',
      type: 'string',
      options: {
        list: [
          { title: 'Litigasi', value: 'Litigasi' },
          { title: 'Konsultasi', value: 'Konsultasi' },
          { title: 'Edukasi', value: 'Edukasi' },
        ],
        layout: 'radio', // Membuat tampilan pilihan jadi tombol radio elegan
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Upload Foto Kegiatan',
      type: 'image',
      options: {
        hotspot: true, // Biar fotonya bisa di-crop otomatis dengan rapi
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Deskripsi / Kronologi Perkara Hukum',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Ukuran Grid Mosaik Tampilan',
      type: 'string',
      options: {
        list: [
          { title: 'Kotak Standar (1 Kolom)', value: 'md:col-span-1' },
          { title: 'Kotak Lebar Mosaik (2 Kolom)', value: 'md:col-span-2' },
        ],
      },
      initialValue: 'md:col-span-1', // Default otomatis ke kotak standar
    }),
  ],
});