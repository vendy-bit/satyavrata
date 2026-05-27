import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'satyavrata-cms',

  projectId: 'xvpo8zb2',
  dataset: 'production',

  basePath: '/studio', // <-- TAMBAHKAN BARIS INI

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})