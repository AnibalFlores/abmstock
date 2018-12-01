// https://github.com/bpampuch/pdfmake
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Facturaventa } from 'src/app/classes/facturaventa';
import { Cliente } from 'src/app/classes/cliente';

// para generar pdfs lado cliente
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ver-facturaventa',
  templateUrl: './ver-facturaventa.component.html',
  styleUrls: ['./ver-facturaventa.component.css']
})

export class VerFacturaventaComponent implements OnInit {
  factura: Facturaventa;
  clie: Cliente;
  titulo = '';
  coniva = false;
  factura_PDF;

  // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/NumberFormat
  Moneda = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  });

  // Convertido con https://www.base64-image.de/
  logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABZCAYAAADIBoEnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4gsdBDkcX3fXUwAABEBJREFUeNrtnUloFEEUhr8xxhgk7itGMSAuoOAhURDBk15FEDwKoiAEvKkXD+JBL95FEaJeRDypoCK4HUwUF6KiEdckmBhIYjazJzMeuiNqZKZ6urZMvx/6EJjUzP///d6rV11TAwHKgUtAB5DRdLUBV4DVCCKhHPim0Yh/r05gvcisjosGzZi47ojM6uiwYMg4sEikzo1pwAJL71MpcqsJZQtVIrdfhkiEKKLbQg3JAK0itVqE3LP0XsuA5SJ5bqwDeixFyS6RO3eEvAe2AQ+BtNQRt0j983dZHv3CKWCv4mv7gHaR/S90ATeBM0C/jgGrLaW7Qr/qgTlFmtLeAbnRY2MpUJLSMNBMoBcoFk1jo0VHYzgEvBEttWC+rk79uWipBZ/FEL9QK4b4hbqUpoGKw26/VDSNhbW6ImQUeC16xkIH8FHn8rukrXh4DGTEEI/qx0SXLYZ4MsOCyYuLcTCN4GFXmWibVw2eCwzojJA0wQKZIDpeAgO6U5akrZjpyoQhL0Tb/Au6CUOeibbxDElpHjgF/AgLlEANTcAqUxGSCQuUIFpDiClDpLDHSFdiiGczLBM1BKAC+CI6K6E/rLdjJiPkK7LVRxVP/zTDlCHSj+SZrkwaInUkj4IuEeIWGeCJLUOkY8+NhrCJtmJIC/BdNFdvCE0bInUkj/ohhng2wxJD3KET+GDbECns2aMjY9uQdqBZtFevH6YNkSiJWD9sGCIN4mSMZrtRTRsihX0y6gl3mLgyJCMe5G4IbRnSBXwWD9QKug1DJG1FKOhiiH00E5zeJ4Z4gvs+fIgyghPlkn4wwBgeHS3yLuFmDAMHVYSabsmQ56ifTNoG3CiQFJUBGoFrvs02DxPtvF+BYWyNGOIrRDKzKAVGIhiyO6lC2ToEczAs7KqoFEP86kcSa0jK4nsdAs4qvnYIeDtFNU0T7G0+Bzzw+YNWJqz3SANHfDZkRtggJa073+hrDRkheeehFKF+QKh1Q6IW9kLBYjHELzSKIX6h1tdp70RO7QFmJcSMMWAe8NPXCBkHXiUoOuqjmOHCEEjWkbKDwGyfVwVOEGwUS1Iv0gps962GpIAaYF8e/1sD3PboxjpJ8BMfUTAK7MGjB2/HY9xhvcAGT3gcjcFjwBcea4j2LOR/1yMPeFQQLHrG4VHnYGb735SjIxfvcMzjgiYeO12SKAlTjg4i5x3yKCb41pMOHpddGrJF42zlk0MeVRp5fHXZh1RoHKvcYf4t1zjWymy6mzZE576vGbj70RidSz2pbDxMG6Jzj1VnOFtzAd08hl0Z0oC+L+w0OKwh1niYNqQFfWcwXndoSKHwAGC/hplJH7BEeOhBEcGSexwixz3o1AuFx+/pb3ueJO5ib5d+UngAsJlgKToKiVv49zyhUHj8brCuEmwiy0agGzgWpgnhYQGbgNMEJxq0hfPyJoLnHtXAQqYGtPP4BX9mHrhW0vnBAAAAAElFTkSuQmCC';

  constructor(private dataSrv: DataService, private ruta: ActivatedRoute) { }

  ngOnInit() {
    this.dataSrv.getFacturaCliente(+this.ruta.snapshot.paramMap.get('id')).subscribe(
      (f: Facturaventa) => {
        this.factura = f;
        this.dataSrv.getCliente(+f.clienteId).subscribe((c: Cliente) => { this.clie = c; });
        this.calculaFactura();
      },
      error => console.log(error));
    this.titulo = 'Detalle Factura Venta';
  }

  descargar() {
    this.armaPDF();
    pdfMake.createPdf(this.factura_PDF).download(
      'factura_' + this.clie.razonsocial.replace(' ', '_') + '_'
      + this.factura.puntoventa + '_'
      + this.factura.numero + '_'
      + '.pdf');
  }

  ver() {
    this.armaPDF();
    pdfMake.createPdf(this.factura_PDF).open();
  }

  private armaPDF() {
    if (this.coniva) {
      this.factura_PDF = {
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
            ]
          },
          { text: 'Comprobante de Ventas.', style: 'subheader', margin: [0, 0, 0, 0] },
          {
            style: 'tableExample',
            table: {
              widths: ['*', 100, 100],
              headerRows: 2,
              keepWithHeaderRows: 2,
              body: [
                [{ text: 'Cliente\n' + this.clie.razonsocial, style: 'tableHeader', alignment: 'center' },
                { text: 'Factura\n' + this.factura.tipo.trim(), style: 'tableHeader', alignment: 'center' },
                {
                  text: 'Número\n' + this.formatoNroFactura(this.factura.puntoventa, this.factura.numero),
                  style: 'tableHeader', alignment: 'center'
                }],
                [{ text: 'Situación IVA', style: 'tableHeader', alignment: 'center' },
                { text: 'CUIT', style: 'tableHeader', alignment: 'center' },
                { text: 'Fecha', style: 'tableHeader', alignment: 'center' }],
                [{ text: this.clie.condicioniva, alignment: 'center' },
                { text: this.clie.cuit, alignment: 'center' },
                { text: this.formatoFecha(this.factura.fecha), alignment: 'center' }],
              ]
            }
          },
          {
            style: 'tableExample',
            table: {
              widths: [55, 55, '*', '*', 55, 55],
              headerRows: 1,
              keepWithHeaderRows: 1,
              body: this.listadoItems()
            },
            layout: 'lightHorizontalLines'
          }, '\n',
          { qr: location.origin + '/verfacturaventa/' + this.factura.id, fit: 100, alignment: 'right' },
          { text: location.origin + '/verfacturaventa/' + this.factura.id, alignment: 'right' }
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
    } else {
      this.factura_PDF = {
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
            ]
          },
          { text: 'Comprobante de Compras.', style: 'subheader', margin: [0, 0, 0, 0] },
          {
            style: 'tableExample',
            table: {
              widths: ['*', 100, 100],
              headerRows: 2,
              keepWithHeaderRows: 2,
              body: [
                [{ text: 'Cliente\n' + this.clie.razonsocial, style: 'tableHeader', alignment: 'center' },
                { text: 'Factura\n' + this.factura.tipo.trim(), style: 'tableHeader', alignment: 'center' },
                {
                  text: 'Número\n' + this.formatoNroFactura(this.factura.puntoventa, this.factura.numero),
                  style: 'tableHeader', alignment: 'center'
                }],
                [{ text: 'Situación IVA', style: 'tableHeader', alignment: 'center' },
                { text: 'CUIT', style: 'tableHeader', alignment: 'center' },
                { text: 'Fecha', style: 'tableHeader', alignment: 'center' }],
                [{ text: this.clie.condicioniva, alignment: 'center' },
                { text: this.clie.cuit, alignment: 'center' },
                { text: this.formatoFecha(this.factura.fecha), alignment: 'center' }],
              ]
            }
          },
          {
            style: 'tableExample',
            table: {
              widths: [55, 55, '*', '*', 55, 55],
              headerRows: 1,
              keepWithHeaderRows: 1,
              body: this.listadoItems()
            },
            layout: 'lightHorizontalLines'
          }, '\n',
          { qr: location.origin + '/verfacturaventa/' + this.factura.id, fit: 100, alignment: 'right' },
          { text: location.origin + '/verfacturaventa/' + this.factura.id, alignment: 'right' }
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
    }

  }

  private formatoNroFactura(sucursal, numero) {
    return ('0000' + sucursal).substr(-4) + '-' + ('00000000' + numero).substr(-8);
  }


  private formatoFecha(date) {
    return new Intl.DateTimeFormat('es-AR').format(new Date(date));

    /*  const d = new Date(date);
      let dia = '' + d.getDate();
      let mes = '' + (d.getMonth() + 1);
      const anio = '' + d.getFullYear();
       if (mes.length < 2) { mes = '0' + mes; }
       if (dia.length < 2) { dia = '0' + dia; }
      return [dia, mes, anio].join('/'); */
  }

  private listadoItems() {
    const todoslositems = [];
    const header = [];
    const footer = [];
    const totales = [];
    header.push({ text: 'Cantidad', style: 'tableHeader' });
    header.push({ text: 'Código', style: 'tableHeader' });
    header.push({ text: 'Descripción', style: 'tableHeader' });
    header.push({ text: 'Precio Uni', style: 'tableHeader' });
    header.push({ text: 'IVA %', style: 'tableHeader' });
    header.push({ text: 'Subtotal', style: 'tableHeader' });
    todoslositems.push(header);
    this.factura.items.forEach(function (item) {
      const unItem = [];
      unItem.push({ text: item.cantidad });
      unItem.push({ text: item.codigoproducto });
      unItem.push({ text: item.descripcion });
      unItem.push({ text: this.Moneda.format(item.preciounitario) });
      unItem.push({ text: item.iva });
      unItem.push({ text: this.Moneda.format(item.subtotal) });
      todoslositems.push(unItem);
    }, this);
    if (this.coniva) {
      footer.push({ text: 'IVA 21%', bold: true });
      footer.push({ text: 'IVA 10,5%', bold: true });
      footer.push({ text: '', bold: true });
      footer.push({ text: '', bold: true });
      footer.push({ text: 'Subtotal IVA', bold: true });
      footer.push({ text: 'Total General', bold: true });
      totales.push({ text: this.Moneda.format(this.factura.iva21) });
      totales.push({ text: this.Moneda.format(this.factura.iva10) });
      totales.push({ text: '' });
      totales.push({ text: '' });
      totales.push({ text: this.Moneda.format(this.factura.subtotaliva) });
      totales.push({ text: this.Moneda.format(this.factura.total), bold: true });
    } else {
      footer.push({ text: '', bold: true });
      footer.push({ text: '', bold: true });
      footer.push({ text: '', bold: true });
      footer.push({ text: '', bold: true });
      footer.push({ text: '', bold: true });
      footer.push({ text: 'Total General', bold: true });
      totales.push({ text: '' });
      totales.push({ text: '' });
      totales.push({ text: '' });
      totales.push({ text: '' });
      totales.push({ text: '' });
      totales.push({ text: this.Moneda.format(this.factura.total), bold: true });
    }
    todoslositems.push(footer);
    todoslositems.push(totales);
    return todoslositems;
  }

  private calculaFactura() {
    // ponemos a cero todo
    this.factura.subtotaliva = 0;
    this.factura.total = 0;
    this.factura.iva21 = 0;
    this.factura.iva10 = 0;

    if (this.factura.tipo.trim() === 'A') {
      // cálculo con iva
      this.coniva = true;
      for (let i = 0; i < this.factura.items.length; i++) {
        this.factura.items[i].subtotal = this.factura.items[i].cantidad * this.factura.items[i].preciounitario;
        if (this.factura.items[i].iva >= 20) {
          this.factura.iva21 += this.factura.items[i].subtotal * 0.21;
        } else {
          this.factura.iva10 += this.factura.items[i].subtotal * 0.105;
        }
        this.factura.total += this.factura.items[i].subtotal;

      }
      this.factura.subtotaliva += this.factura.iva21 + this.factura.iva10;
      this.factura.total += this.factura.subtotaliva;
    } else {
      // cálculo sin iva
      for (let i = 0; i < this.factura.items.length; i++) {
        this.factura.items[i].subtotal = this.factura.items[i].cantidad
          * this.factura.items[i].preciounitario * (1 + (this.factura.items[i].iva / 100));
        this.factura.total += this.factura.items[i].subtotal;

      }
    }
  }

}

