// https://github.com/bpampuch/pdfmake
import { Component, OnInit } from '@angular/core';
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-ver-facturacompra',
  templateUrl: './ver-facturacompra.component.html',
  styleUrls: ['./ver-facturacompra.component.css']
})
export class VerFacturacompraComponent implements OnInit {

  greeting = 'Can you see me';
  url = 'http://pdfmake.org';
  longText = 'The amount of data that can be stored in the QR code symbol depends on the datatype (mode, or input character set), version (1, …, 40, indicating the overall dimensions of the symbol), and error correction level. The maximum storage capacities occur for 40-L symbols (version 40, error correction level L):'

  docDefinition1 = {
    pageMargins: [10, 10, 10, 10],
    content: [
      this.header(this.greeting),
      { qr: this.greeting },
      '\n',

      this.header('Colored QR'),
      { qr: this.greeting, foreground: 'red', background: 'yellow' },
      '\n',

      this.header(this.url),
      { qr: this.url },
      '\n',

      this.header('A very long text (' + this.longText.length + ' chars)'),
      { qr: this.longText },
      '\n',
      this.header('same long text with fit = 100 and alignment = right'),
      { qr: this.longText, fit: 150, alignment: 'right' },
    ]
  };

  docDefinition2 = {
    content: [
      { text: 'Tables', style: 'header' },
      'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
      { text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader' },
      'The following table has nothing more than a body array',
      {
        style: 'tableExample',
        table: {
          body: [
            ['Column 1', 'Column 2', 'Column 3'],
            ['One value goes here', 'Another one here', 'OK?']
          ]
        }
      },
      { text: 'A simple table with nested elements', style: 'subheader' },
      'It is of course possible to nest any other type of nodes available in pdfmake inside table cells',
      {
        style: 'tableExample',
        table: {
          body: [
            ['Column 1', 'Column 2', 'Column 3'],
            [
              {
                stack: [
                  'Let\'s try an unordered list',
                  {
                    ul: [
                      'item 1',
                      'item 2'
                    ]
                  }
                ]
              },
              [
                'or a nested table',
                {
                  table: {
                    body: [
                      ['Col1', 'Col2', 'Col3'],
                      ['1', '2', '3'],
                      ['1', '2', '3']
                    ]
                  },
                }
              ],
              {
                text: [
                  'Inlines can be ',
                  { text: 'styled\n', italics: true },
                  { text: 'easily as everywhere else', fontSize: 10 }]
              }
            ]
          ]
        }
      },
      { text: 'Defining column widths', style: 'subheader' },
      'Tables support the same width definitions as standard columns:',
      {
        bold: true,
        ul: [
          'auto',
          'star',
          'fixed value'
        ]
      },
      {
        style: 'tableExample',
        table: {
          widths: [100, '*', 200, '*'],
          body: [
            ['width=100', 'star-sized', 'width=200', 'star-sized'],
            ['fixed-width cells have exactly the specified width', { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 'auto'],
          body: [
            ['This is a star-sized column. The next column over, an auto-sized column, will wrap to accomodate all the text in this cell.', 'I am auto sized.'],
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 'auto'],
          body: [
            ['This is a star-sized column. The next column over, an auto-sized column, will not wrap to accomodate all the text in this cell, because it has been given the noWrap style.', { text: 'I am auto sized.', noWrap: true }],
          ]
        }
      },
      { text: 'Defining row heights', style: 'subheader' },
      {
        style: 'tableExample',
        table: {
          heights: [20, 50, 70],
          body: [
            ['row 1 with height 20', 'column B'],
            ['row 2 with height 50', 'column B'],
            ['row 3 with height 70', 'column B']
          ]
        }
      },
      'With same height:',
      {
        style: 'tableExample',
        table: {
          heights: 40,
          body: [
            ['row 1', 'column B'],
            ['row 2', 'column B'],
            ['row 3', 'column B']
          ]
        }
      },
      'With height from function:',
      {
        style: 'tableExample',
        table: {
          heights: function (row) {
            return (row + 1) * 25;
          },
          body: [
            ['row 1', 'column B'],
            ['row 2', 'column B'],
            ['row 3', 'column B']
          ]
        }
      },
      { text: 'Column/row spans', pageBreak: 'before', style: 'subheader' },
      'Each cell-element can set a rowSpan or colSpan',
      {
        style: 'tableExample',
        color: '#444',
        table: {
          widths: [200, 'auto', 'auto'],
          headerRows: 2,
          // keepWithHeaderRows: 1,
          body: [
            [{ text: 'Header with Colspan = 2', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
            [{ text: 'Header 1', style: 'tableHeader', alignment: 'center' }, { text: 'Header 2', style: 'tableHeader', alignment: 'center' }, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            [{ rowSpan: 3, text: 'rowSpan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor' }, 'Sample value 2', 'Sample value 3'],
            ['', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', { colSpan: 2, rowSpan: 2, text: 'Both:\nrowSpan and colSpan\ncan be defined at the same time' }, ''],
            ['Sample value 1', '', ''],
          ]
        }
      },
      { text: 'Headers', pageBreak: 'before', style: 'subheader' },
      'You can declare how many rows should be treated as a header. Headers are automatically repeated on the following pages',
      { text: ['It is also possible to set keepWithHeaderRows to make sure there will be no page-break between the header and these rows. Take a look at the document-definition and play with it. If you set it to one, the following table will automatically start on the next page, since there\'s not enough space for the first row to be rendered here'], color: 'gray', italics: true },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          // dontBreakRows: true,
          // keepWithHeaderRows: 1,
          body: [
            [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
            [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            ]
          ]
        }
      },
      { text: 'Styling tables', style: 'subheader' },
      'You can provide a custom styler for the table. Currently it supports:',
      {
        ul: [
          'line widths',
          'line colors',
          'cell paddings',
        ]
      },
      'with more options coming soon...\n\npdfmake currently has a few predefined styles (see them on the next page)',
      { text: 'noBorders:', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8] },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          body: [
            [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
          ]
        },
        layout: 'noBorders'
      },
      { text: 'headerLineOnly:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          body: [
            [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
          ]
        },
        layout: 'headerLineOnly'
      },
      { text: 'lightHorizontalLines:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          body: [
            [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
          ]
        },
        layout: 'lightHorizontalLines'
      },
      { text: 'but you can provide a custom styler as well', margin: [0, 20, 0, 8] },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          body: [
            [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
          ]
        },
        layout: {
          hLineWidth: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 2 : 1;
          },
          vLineWidth: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
          },
          hLineColor: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
          },
          vLineColor: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
          },
          // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          // paddingLeft: function(i, node) { return 4; },
          // paddingRight: function(i, node) { return 4; },
          // paddingTop: function(i, node) { return 2; },
          // paddingBottom: function(i, node) { return 2; },
          // fillColor: function (rowIndex, node, columnIndex) { return null; }
        }
      },
      { text: 'zebra style', margin: [0, 20, 0, 8] },
      {
        style: 'tableExample',
        table: {
          body: [
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
          ]
        },
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
          }
        }
      },
      { text: 'and can be used dash border', margin: [0, 20, 0, 8] },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          body: [
            [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3'],
          ]
        },
        layout: {
          hLineWidth: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 2 : 1;
          },
          vLineWidth: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
          },
          hLineColor: function (i, node) {
            return 'black';
          },
          vLineColor: function (i, node) {
            return 'black';
          },
          hLineStyle: function (i, node) {
            if (i === 0 || i === node.table.body.length) {
              return null;
            }
            return { dash: { length: 10, space: 4 } };
          },
          vLineStyle: function (i, node) {
            if (i === 0 || i === node.table.widths.length) {
              return null;
            }
            return { dash: { length: 4 } };
          },
          // paddingLeft: function(i, node) { return 4; },
          // paddingRight: function(i, node) { return 4; },
          // paddingTop: function(i, node) { return 2; },
          // paddingBottom: function(i, node) { return 2; },
          // fillColor: function (i, node) { return null; }
        }
      },
      { text: 'Optional border', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8] },
      'Each cell contains an optional border property: an array of 4 booleans for left border, top border, right border, bottom border.',
      {
        style: 'tableExample',
        table: {
          body: [
            [
              {
                border: [false, true, false, false],
                fillColor: '#eeeeee',
                text: 'border:\n[false, true, false, false]'
              },
              {
                border: [false, false, false, false],
                fillColor: '#dddddd',
                text: 'border:\n[false, false, false, false]'
              },
              {
                border: [true, true, true, true],
                fillColor: '#eeeeee',
                text: 'border:\n[true, true, true, true]'
              }
            ],
            [
              {
                rowSpan: 3,
                border: [true, true, true, true],
                fillColor: '#eeeeff',
                text: 'rowSpan: 3\n\nborder:\n[true, true, true, true]'
              },
              {
                border: undefined,
                fillColor: '#eeeeee',
                text: 'border:\nundefined'
              },
              {
                border: [true, false, false, false],
                fillColor: '#dddddd',
                text: 'border:\n[true, false, false, false]'
              }
            ],
            [
              '',
              {
                colSpan: 2,
                border: [true, true, true, true],
                fillColor: '#eeffee',
                text: 'colSpan: 2\n\nborder:\n[true, true, true, true]'
              },
              ''
            ],
            [
              '',
              {
                border: undefined,
                fillColor: '#eeeeee',
                text: 'border:\nundefined'
              },
              {
                border: [false, false, true, true],
                fillColor: '#dddddd',
                text: 'border:\n[false, false, true, true]'
              }
            ]
          ]
        },
        layout: {
          defaultBorder: false,
        }
      },
      'For every cell without a border property, whether it has all borders or not is determined by layout.defaultBorder, which is false in the table above and true (by default) in the table below.',
      {
        style: 'tableExample',
        table: {
          body: [
            [
              {
                border: [false, false, false, false],
                fillColor: '#eeeeee',
                text: 'border:\n[false, false, false, false]'
              },
              {
                fillColor: '#dddddd',
                text: 'border:\nundefined'
              },
              {
                fillColor: '#eeeeee',
                text: 'border:\nundefined'
              },
            ],
            [
              {
                fillColor: '#dddddd',
                text: 'border:\nundefined'
              },
              {
                fillColor: '#eeeeee',
                text: 'border:\nundefined'
              },
              {
                border: [true, true, false, false],
                fillColor: '#dddddd',
                text: 'border:\n[true, true, false, false]'
              },
            ]
          ]
        }
      },
      'And some other examples with rowSpan/colSpan...',
      {
        style: 'tableExample',
        table: {
          body: [
            [
              '',
              'column 1',
              'column 2',
              'column 3'
            ],
            [
              'row 1',
              {
                rowSpan: 3,
                colSpan: 3,
                border: [true, true, true, true],
                fillColor: '#cccccc',
                text: 'rowSpan: 3\ncolSpan: 3\n\nborder:\n[true, true, true, true]'
              },
              '',
              ''
            ],
            [
              'row 2',
              '',
              '',
              ''
            ],
            [
              'row 3',
              '',
              '',
              ''
            ]
          ]
        },
        layout: {
          defaultBorder: false,
        }
      },
      {
        style: 'tableExample',
        table: {
          body: [
            [
              {
                colSpan: 3,
                text: 'colSpan: 3\n\nborder:\n[false, false, false, false]',
                fillColor: '#eeeeee',
                border: [false, false, false, false]
              },
              '',
              ''
            ],
            [
              'border:\nundefined',
              'border:\nundefined',
              'border:\nundefined'
            ]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          body: [
            [
              { rowSpan: 3, text: 'rowSpan: 3\n\nborder:\n[false, false, false, false]', fillColor: '#eeeeee', border: [false, false, false, false] },
              'border:\nundefined',
              'border:\nundefined'
            ],
            [
              '',
              'border:\nundefined',
              'border:\nundefined'
            ],
            [
              '',
              'border:\nundefined',
              'border:\nundefined'
            ]
          ]
        }
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    },
    defaultStyle: {
      // alignment: 'justify'
    }
  };

 // Convertido con https://www.base64-image.de/
  logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABZCAYAAADIBoEnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4gsdBDkcX3fXUwAABEBJREFUeNrtnUloFEEUhr8xxhgk7itGMSAuoOAhURDBk15FEDwKoiAEvKkXD+JBL95FEaJeRDypoCK4HUwUF6KiEdckmBhIYjazJzMeuiNqZKZ6urZMvx/6EJjUzP///d6rV11TAwHKgUtAB5DRdLUBV4DVCCKhHPim0Yh/r05gvcisjosGzZi47ojM6uiwYMg4sEikzo1pwAJL71MpcqsJZQtVIrdfhkiEKKLbQg3JAK0itVqE3LP0XsuA5SJ5bqwDeixFyS6RO3eEvAe2AQ+BtNQRt0j983dZHv3CKWCv4mv7gHaR/S90ATeBM0C/jgGrLaW7Qr/qgTlFmtLeAbnRY2MpUJLSMNBMoBcoFk1jo0VHYzgEvBEttWC+rk79uWipBZ/FEL9QK4b4hbqUpoGKw26/VDSNhbW6ImQUeC16xkIH8FHn8rukrXh4DGTEEI/qx0SXLYZ4MsOCyYuLcTCN4GFXmWibVw2eCwzojJA0wQKZIDpeAgO6U5akrZjpyoQhL0Tb/Au6CUOeibbxDElpHjgF/AgLlEANTcAqUxGSCQuUIFpDiClDpLDHSFdiiGczLBM1BKAC+CI6K6E/rLdjJiPkK7LVRxVP/zTDlCHSj+SZrkwaInUkj4IuEeIWGeCJLUOkY8+NhrCJtmJIC/BdNFdvCE0bInUkj/ohhng2wxJD3KET+GDbECns2aMjY9uQdqBZtFevH6YNkSiJWD9sGCIN4mSMZrtRTRsihX0y6gl3mLgyJCMe5G4IbRnSBXwWD9QKug1DJG1FKOhiiH00E5zeJ4Z4gvs+fIgyghPlkn4wwBgeHS3yLuFmDAMHVYSabsmQ56ifTNoG3CiQFJUBGoFrvs02DxPtvF+BYWyNGOIrRDKzKAVGIhiyO6lC2ToEczAs7KqoFEP86kcSa0jK4nsdAs4qvnYIeDtFNU0T7G0+Bzzw+YNWJqz3SANHfDZkRtggJa073+hrDRkheeehFKF+QKh1Q6IW9kLBYjHELzSKIX6h1tdp70RO7QFmJcSMMWAe8NPXCBkHXiUoOuqjmOHCEEjWkbKDwGyfVwVOEGwUS1Iv0gps962GpIAaYF8e/1sD3PboxjpJ8BMfUTAK7MGjB2/HY9xhvcAGT3gcjcFjwBcea4j2LOR/1yMPeFQQLHrG4VHnYGb735SjIxfvcMzjgiYeO12SKAlTjg4i5x3yKCb41pMOHpddGrJF42zlk0MeVRp5fHXZh1RoHKvcYf4t1zjWymy6mzZE576vGbj70RidSz2pbDxMG6Jzj1VnOFtzAd08hl0Z0oC+L+w0OKwh1niYNqQFfWcwXndoSKHwAGC/hplJH7BEeOhBEcGSexwixz3o1AuFx+/pb3ueJO5ib5d+UngAsJlgKToKiVv49zyhUHj8brCuEmwiy0agGzgWpgnhYQGbgNMEJxq0hfPyJoLnHtXAQqYGtPP4BX9mHrhW0vnBAAAAAElFTkSuQmCC';

  docDefinition = {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    watermark: { text: 'No válido como factura', color: 'red', fontSize: 20, opacity: 0.2, bold: true, italics: false },
    content: [
      {
        columns: [
          {
            image: this.logo,
            width: 20,
            alignment: 'left'
          },
          {
            margin: [5, 0, 0, 0],
            width: 100,
            alignment: 'left',
            text: 'ABM Stock',
            style: 'header'
          }
        ]},
      { text: 'Comprobante de Compras.', style: 'subheader', margin: [0, 0, 0, 0] },
      {
        style: 'tableExample',
        table: {
          widths: ['*', 100, 100],
          headerRows: 2,
          // keepWithHeaderRows: 1,
          body: [
            [{ text: 'Proveedor\nAiroldi S.A.', style: 'tableHeader', alignment: 'center' },
            { text: 'Factura\nA', style: 'tableHeader', alignment: 'center' },
            { text: 'Nro\n0000-000000', style: 'tableHeader', alignment: 'center' }],
            [{ text: 'Situacion IVA', style: 'tableHeader', alignment: 'center' },
            { text: 'CUIT', style: 'tableHeader', alignment: 'center' },
            { text: 'Fecha', style: 'tableHeader', alignment: 'center' }],
            [{ text: 'Responsable Inscripto', alignment: 'center' },
            { text: '00-00000000-0', alignment: 'center' },
            { text: '27/11/2018', alignment: 'center' }],
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          widths: [55, 55, '*', '*', 55, 55],
          headerRows: 1,
          body: [
            [{ text: 'Cantidad', style: 'tableHeader' },
            { text: 'Código', style: 'tableHeader' },
            { text: 'Descripción', style: 'tableHeader' },
            { text: 'Precio Uni', style: 'tableHeader' },
            { text: 'IVA %', style: 'tableHeader' },
            { text: 'Subtotal', style: 'tableHeader' }
            ],
            ['10', 'M105', 'Mouse Genius 105', '120.50', '21.00', '1205.00'],
            ['1', 'MN1', 'Monitor Samsung 19"', '2980.87', '10.50', '2980.87'],
            ['2', 'M105', 'Mouse Genius 105', '120.50', '21.00', '1205.00'],
            ['3', 'M105', 'Mouse Genius 105', '120.50', '21.00', '1205.00'],
            [{ text: 'IVA 21%', bold: true },
            { text: 'IVA 10,5%', bold: true }, '', '',
            { text: 'Subtotal IVA', bold: true },
            { text: 'Total General', bold: true }],
            ['100.00', '120.50', '', '', '220.50', { text: '4864,87', bold: true }]
          ]
        },
        layout: 'lightHorizontalLines'
      }, '\n',
      { qr: 'Proveedor: Airoldi S.A. Factura A 0000-00000 27/11/2018 Total: $ 4864,87', fit: 100, alignment: 'right' }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 0]
      },
      subheader: {
        fontSize: 12,
        bold: true,
        margin: [0, 0, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 0],
        border: [false, false, false, false]
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        color: 'black',
      }
    },
    defaultStyle: {
      fontSize: 10,
      alignment: 'justify'
    }
  };


  private header(text) {
    return { text: text, margins: [0, 0, 0, 8] };
  }

  constructor() {

  }

  ngOnInit() {
  }

  descargar() {
    // pdfMake.createPdf(this.docDefinition).download('factura.pdf');
    pdfMake.createPdf(this.docDefinition).open();
  }
}
