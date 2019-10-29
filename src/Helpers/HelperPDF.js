import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export default {
  methods: {
    downloadInvoicePDF (doc, filename) {
      pdfMake.vfs = pdfFonts.pdfMake.vfs
      // pdfMake.createPdf(doc).download(`${filename}.pdf`)
      pdfMake.createPdf(doc).open()
    }
  }
}
