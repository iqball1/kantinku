import { ListMakanan, ListMinuman } from '../../assets'
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

export const dummyMenus = [
    {
        id:1,
        nama:"Indomie Goreng",
        keterangan:"Dimasak/matang",
        gambar: IndomieGoreng,
        kategori: {
            id:1,
            nama:"Makanan",
            gambar: ListMakanan,
        },
        harga:"5000",
        ready:true
    },
    {
        id:2,
        nama:"Indomie Kaldu Ayam",
        keterangan:"Dimasak/matang",
        gambar: KalduAyam,
        kategori: {
            id:1,
            nama:"Makanan",
            gambar: ListMakanan,
        },
        harga:"5000",
        ready:true
    },
    {
        id:3,
        nama:"Nasi Pecel",
        keterangan:"Nasi pecel + tempe + ayam",
        gambar: Pecel,
        kategori: {
            id:1,
            nama:"Makanan",
            gambar: ListMakanan,
        },
        harga:"10000",
        ready:true
    },
    {
        id:4,
        nama:"Ayam Goreng Saja",
        gambar: AyamGoreng,
        kategori: {
            id:1,
            nama:"Makanan",
            gambar: ListMakanan,
        },
        harga:"4000",
        ready:true
    },
    {
        id:5,
        nama:"Sayur Asem + Nasi",
        gambar: SayurAsem,
        kategori: {
            id:1,
            nama:"Makanan",
            gambar: ListMakanan,
        },
        harga:"10000",
        ready:true
    },

    {
        id:6,
        nama:"Aqua Botol 600ml",
        gambar: Aqua,
        kategori: {
            id:2,
            nama:"Minuman",
            gambar: ListMinuman,
        },
        harga:"3500",
        ready:true
    },
 
    {
        id:7,
        nama:"Coca-Cola",
        gambar: Cocacola,
        kategori: {
            id:2,
            nama:"Minuman",
            gambar: ListMinuman,
        },
        harga:"5000",
        ready:true
    },
    {
        id:8,
        nama:"Fanta",
        gambar: Fanta,
        kategori: {
            id:2,
            nama:"Minuman",
            gambar: ListMinuman,
        },
        harga:"5000",
        ready:true
    },
    {
        id:9,
        nama:"Floridina",
        gambar: Floridina,
        kategori: {
            id:2,
            nama:"Minuman",
            gambar: ListMinuman,
        },
        harga:"3500",
        ready:true
    },
    {
        id:10,
        nama:"FruitTea",
        gambar: FruitTea,
        kategori: {
            id:2,
            nama:"Minuman",
            gambar: ListMinuman,
        },
        harga:"3500",
        ready:true
    },
    {
        id:11,
        nama:"GoodMood",
        gambar: GoodMood,
        kategori: {
            id:2,
            nama:"Minuman",
            gambar: ListMinuman,
        },
        harga:"6500",
        ready:true
    },
    {
        id:12,
        nama:"Sprite",
        gambar: Sprite,
        kategori: {
            id:2,
            nama:"Minuman",
            gambar: ListMinuman,
        },
        harga:"5000",
        ready:true
    },
    {
        id:13,
        nama:"Teh Pucuk",
        gambar: TehPucuk,
        kategori: {
            id:2,
            nama:"Minuman",
            gambar: ListMinuman,
        },
        harga:"3000",
        ready:true
    },
]