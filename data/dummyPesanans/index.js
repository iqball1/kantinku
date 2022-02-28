import ListMakanan from '../../assets'
import {
  Aqua,
  AyamGoreng,
  Cocacola,
  Fanta,
  Floridina,
  FruitTea,
  GoodMood,
  IndomieGoreng,
  KalduAyam,
  Pecel,
  SayurAsem,
  Sprite,
  TehPucuk
} from '../../assets';

export const dummyPesanans = [
  {
    id: 1,
    tanggalPesan: 'Jumat, 18 September 2018',
    status: 'Belum diambil',
    totalHarga: '50000',
    pesanans: [
      {
        id: 1,
        product: {
          id: 1,
          nama: 'Indomie Goreng',
          gambar: IndomieGoreng,
          kategori: {
            id: 1,
            nama: 'Makanan',
            gambar: ListMakanan,
          },
          harga: '5000',
          ready: true
        },
        jumlahPesanan: 4,
        totalHarga: 20000,
        catatan: null
      },
      {
        id: 2,
        product: {
          id: 2,
          nama: 'Indomie Kaldu Ayam',
          gambar: KalduAyam,
          kategori: {
            id: 1,
            nama: 'Makanan',
            gambar: ListMakanan,
          },
          harga: '5000',
          ready: true
        },
        jumlahPesanan: 6,
        totalHarga: 30000,
        catatan: 'Pedasss semuaa'
      },
    ]
  },
  {
    id: 2,
    tanggalPesan: 'Sabtu, 19 September 2018',
    status: 'Belum diambil',
    totalHarga: '50000',
    pesanans: [
      {
        id: 1,
        product: {
          id: 1,
          nama: 'Indomie Goreng',
          gambar: IndomieGoreng,
          kategori: {
            id: 1,
            nama: 'Makanan',
            gambar: ListMakanan,
          },
          harga: '5000',
          ready: true
        },
        jumlahPesanan: 4,
        totalHarga: 20000,
        catatan: null
      },
      {
        id: 2,
        product: {
          id: 2,
          nama: 'Indomie Kaldu Ayam',
          gambar: KalduAyam,
          kategori: {
            id: 1,
            nama: 'Makanan',
            gambar: ListMakanan,
          },
          harga: '5000',
          ready: true
        },
        jumlahPesanan: 4,
        totalHarga: 30000,
        catatan: 'Pedasss semuaa'
      },

    ]
  }
]