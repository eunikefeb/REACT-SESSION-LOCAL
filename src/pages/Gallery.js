import React, { Component } from "react";
import $ from "jquery";
import Card from "../components/Card";
import "bootstrap/dist/css/bootstrap.min.css";

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      buku: [{ 
        isbn: "12345",
        judul: "Dilan 1990",
        penulis: "Pidi Baiq",
        penerbit: "Pastel Books",
        harga: 75000,
        cover: "https://i.pinimg.com/564x/2c/38/d7/2c38d7b576a1839e0bb60a448091e466.jpg"
      },
      {
        isbn: "12346",
        judul: "Dilan 1991",
        penulis: "Pidi Baiq",
        penerbit: "Pastel Books",
        harga: 75000,
        cover: "https://i.pinimg.com/564x/ab/95/8a/ab958a1428ba7b9b33f0ee071d3bf329.jpg"
      },
      {
        isbn: "12346",
        judul: "Milea",
        penulis: "Pidi Baiq",
        penerbit: "Pastel Books",
        harga: 75000,
        cover: "https://i.pinimg.com/474x/bf/20/f2/bf20f2ce4abe6a1cf1f3d87c989de5ec.jpg"
      },
      {
        isbn: "12346",
        judul: "Milea Suara dari Dilan",
        penulis: "Pidi Baiq",
        penerbit: "Pastel Books",
        harga: 75000,
        cover: "https://i.pinimg.com/564x/a4/f5/b7/a4f5b7d8ea0a8c01c122f1d5330f228d.jpg"
      },
    ],

      action: "",
      isbn: "",
      judul: "",
      penulis: "",
      penerbit: "",
      harga: 0,
      cover: "",
      selectedItem: null,
    };
    this.state.filterBuku = this.state.buku;
  }

  Add = () => {
    // menampilkan komponen modal
    $("#modal_buku").show();
    this.setState({
      isbn: Math.random(1, 10000000),
      judul: "",
      penulis: "",
      penerbit: "",
      cover: "",
      harga: 0,
      action: "insert",
    });
  };

  Edit = (item) => {
    // menampilkan komponen modal
    $("#modal_buku").show();
    this.setState({
      isbn: item.isbn,
      judul: item.judul,
      penulis: item.penulis,
      penerbit: item.penerbit,
      cover: item.cover,
      harga: item.harga,
      action: "update",
      selectedItem: item,
    });
  };

  Save = (event) => {
    event.preventDefault();
    // menampung data state buku
    let tempBuku = this.state.buku;

    if (this.state.action === "insert") {
      // menambah data baru
      tempBuku.push({
        isbn: this.state.isbn,
        judul: this.state.judul,
        penulis: this.state.penulis,
        penerbit: this.state.penerbit,
        cover: this.state.cover,
        harga: this.state.harga,
      });
    } else if (this.state.action === "update") {
      // menyimpan perubahan data
      let index = tempBuku.indexOf(this.state.selectedItem);
      tempBuku[index].isbn = this.state.isbn;
      tempBuku[index].judul = this.state.judul;
      tempBuku[index].penulis = this.state.penulis;
      tempBuku[index].penerbit = this.state.penerbit;
      tempBuku[index].cover = this.state.cover;
      tempBuku[index].harga = this.state.harga;
    }

    this.setState({ buku: tempBuku });

    // menutup komponen modal_buku
    $("#modal_buku").hide();
  };

  Drop = (item) => {
    // beri konfirmasi untuk menghapus data
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      // menghapus data
      let tempBuku = this.state.buku;
      // posisi index data yg akan dihapus
      let index = tempBuku.indexOf(item);

      // hapus data
      tempBuku.splice(index, 1);

      this.setState({ buku: tempBuku });
    }
  };

  searching = (event) => {
    if (event.keyCode === 13) {
      // 13 adalah kode untuk tombol enter

      let keyword = this.state.keyword.toLowerCase();
      let tempBuku = this.state.buku;
      let result = tempBuku.filter((item) => {
        return (
          item.judul.toLowerCase().includes(keyword) ||
          item.penulis.toLowerCase().includes(keyword) ||
          item.penerbit.toLowerCase().includes(keyword)
        );
      });

      this.setState({ filterBuku: result });
    }
  };

  Close = () => {
    $("#modal_buku").hide();
  };

  // SESSION STORAGE
  setUser = () => {
    // cek eksistensi dari session storage
    if (sessionStorage.getItem("user") === null) {
      // kondisi jika session storage "user" belum dibuat
      let prompt = window.prompt("Masukkan Nama Anda", "");
      if (prompt === null || prompt === "") {
        // jika user tidak mengisikan namanya
        this.setUser();
      } else {
        // jika user telah mengisikan namanya, simpan nama user ke session storage
        sessionStorage.setItem("user", prompt);
        // simpan nama user ke state.user
        this.setState({ user: prompt });
      }
    } else {
      // kondisi saat session storage "user" telah dibuat,
      // akses nilai dari session storage "user"
      let name = sessionStorage.getItem("user");
      this.setState({ user: name });
    }
  };

  // LOCAL STORAGE
  // setUser = () => {
  //     // cek eksistensi dari local storage
  //     if (localStorage.getItem("user") === null) {
  //         // kondisi jika local storage "user" belum dibuat
  //         let prompt = window.prompt("Masukkan Nama Anda", "")
  //         if (prompt === null || prompt === "") {
  //             // jika user tidak mengisikan namanya
  //             this.setUser()
  //         } else {
  //             // jika user telah mengisikan namanya, simpan nama user ke local storage
  //             localStorage.setItem("user", prompt)
  //             // simpan nama user ke state.user
  //             this.setState({user: prompt})
  //         }
  //     } else {
  //         // kondisi saat local storage "user" telah dibuat,
  //         // akses nilai dari local storage "user"
  //         let name = localStorage.getItem("user")
  //         this.setState({user: name})
  //     }
  // }

  // untuk memanggil fungsi setUser() dan fungsi ini dijalankan setelah semua komponen di dalam fungsi render terpasang
  componentDidMount() {
    this.setUser();
  }

  // menambahkan item yang dipilih user ke keranjang belanja
  addToCart = (selectedItem) => {
    // membuat sebuah variabel untuk menampung cart sementara
    let tempCart = [];

    // cek eksistensi dari data cart pada localStorage
    if (localStorage.getItem("cart") !== null) {
      tempCart = JSON.parse(localStorage.getItem("cart"));
      // JSON.parse() digunakan untuk mengonversi dari string -> array object
    }

    // cek data yang dipilih user ke keranjang belanja
    let existItem = tempCart.find((item) => item.isbn === selectedItem.isbn);
    if (existItem) {
      // jika item yang dipilih ada pada keranjang belanja
      window.alert("Anda telah memilih item ini");
    } else {
      // user diminta memasukkan jumlah item yang dibeli
      let promptJumlah = window.prompt("Masukkan jumlah item yang dibeli", "");
      if (promptJumlah !== null && promptJumlah !== "") {
        // jika user memasukkan jumlah item yang dibeli

        // menambahkan properti "jumlahBeli" pada item yang dipilih
        selectedItem.jumlahBeli = promptJumlah;

        // masukkan item yang dipilih ke dalam cart
        tempCart.push(selectedItem);

        // simpan array tempCart ke localStorage
        localStorage.setItem("cart", JSON.stringify(tempCart));
      }
    }
  };

  render() {
    return (
      <div className="container">
        <br />
        <h4 className="text-info my-2">Nama Pengguna: {this.state.user}</h4>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Pencarian"
          value={this.state.keyword}
          onChange={(ev) => this.setState({ keyword: ev.target.value })}
          onKeyUp={(ev) => this.searching(ev)}
        />
        <div className="row">
          {this.state.filterBuku.map((item, index) => (
            <Card
              key={index}
              judul={item.judul}
              penulis={item.penulis}
              penerbit={item.penerbit}
              harga={item.harga}
              cover={item.cover}
              onEdit={() => this.Edit(item)}
              onDrop={() => this.Drop(item)}
              onCart={() => this.addToCart(item)}
            />
          ))}
        </div>

        <center><button
          className="btn btn-success"
          onClick={() => this.Add()}
          data-toggle="modal"
          data-target="#modal_buku"
        >
          Tambah Data
        </button></center><br></br>

        {/* component modal sbg control manipulasi data */}
        <div className="modal" id="modal_buku">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 class="modal-title">
                  <b>Modal Book</b>
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.Close()}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={(ev) => this.Save(ev)}>
                  Judul Buku
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.judul}
                    onChange={(ev) => this.setState({ judul: ev.target.value })}
                    required
                  />
                  Penulis Buku
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.penulis}
                    onChange={(ev) =>
                      this.setState({ penulis: ev.target.value })
                    }
                    required
                  />
                  Penerbit Buku
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.penerbit}
                    onChange={(ev) =>
                      this.setState({ penerbit: ev.target.value })
                    }
                    required
                  />
                  Harga Buku
                  <input
                    type="number"
                    className="form-control mb-2"
                    value={this.state.harga}
                    onChange={(ev) => this.setState({ harga: ev.target.value })}
                    required
                  />
                  Cover Buku
                  <input
                    type="url"
                    className="form-control mb-2"
                    value={this.state.cover}
                    onChange={(ev) => this.setState({ cover: ev.target.value })}
                    required
                  />
                  <button className="btn btn-info btn-block" type="submit">
                    Simpan
                  </button>
                </form>

                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
