"use client";
import Stat from "./Stat";
import { useState, useEffect, useContext } from "react";
import {
  Cart,
  Delete,
  Errors,
  Success,
  Search,
  NoProduct,
  Order,
  Person,
  Close,
} from "../../../svg";
import { alertContext } from "../providers/One";
import { Box, Modal } from "@mui/material";
export default function Dash() {
  const [red,setRed] = useState(false)
  const { handleAlert } = useContext(alertContext);
  const [stat, setStat] = useState([
    {
      title: "Utilisateur",
      desc: "La cart affiche le nombre d'utilisateur visité le site web",
      nb: 0,
      type: <Person size={25} color={"gray"} />,
    },
    {
      title: "Produit",
      desc: "La cart affiche le nombre de produit dans le site web",
      nb: 0,
      type: <NoProduct width={25} color={"gray"} />,
    },
    {
      title: "Commande",
      desc: "La cart affiche le nombre de commande dans le site web",
      nb: 0,
      type: <Order width={25} height={25} color={"gray"} />,
    },
  ]);
  const [search,setSearch] = useState('')
  const [values, setValues] = useState({
    name: "",
    img: null,
    price: "",
    qte: "",
    type: "",
    desc_s: "",
    desc_b: "",
  });
  const [products, setProducts] = useState([]);
  const [filtredProducts,setFiltredProducts] = useState([])
  const [loading, setLoading] = useState(true); // Added loading state
  const [open, setOpen] = useState(false);
  const [fichier,setFichier] = useState(null)
  const [loadingAdd,setLoadingAdd] = useState(false)
  const GET_STATE = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/stat/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.status !== 200) {
        console.log(data.message);
      } else {
        setStat((prevStat) => [
          { ...prevStat[0], nb: data.user_count },
          { ...prevStat[1], nb: data.product_count },
          { ...prevStat[2], nb: data.order_count },
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const GET_PRODUCT = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/product/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status !== 200) {
        console.log(data.message);
      } else {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onChangeQTE = async (id, bool) => {
    console.log(id, bool);
    if (!bool) {
      setProducts((prevQte) =>
        prevQte.map((item) =>
          item.id_product === id ? { ...item, qte: item.qte - 1 } : item
        )
      );
    } else {
      setProducts((prevQte) =>
        prevQte.map((item) =>
          item.id_product === id ? { ...item, qte: item.qte + 1 } : item
        )
      );
    }
    const updatedProduct = products.find((item) => item.id_product === id);
    if (!updatedProduct) return;

    const newQte = updatedProduct.qte + (bool ? 1 : -1);

    try {
      const res = await fetch("/api/productQTE/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_product: id, qte: newQte }),
      });

      const data = await res.json();
      console.log(data);

      if (data.status !== 200) {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const DELETE = async (id) => {
    try {
      const res = await fetch("/api/deleteProduct/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      console.log(data);

      if (data.status !== 200) {
        throw new Error(data.message);
      }
      setProducts((prevValue) =>
        prevValue.filter((item) => item.id_product !== id)
      );
      handleAlert({
        open: true,
        type: true,
        message: "Product deleted successfully",
      });
      setTimeout(() => {
        handleAlert({
          open: false,
          type: false,
          message: "",
        });
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onSubmit = async(e) => {
    e.preventDefault()
    if(values.name == '' || values.qte == '' || values.price === '' || values.desc_b == '' || values.desc_s == '' || values.type == '' || fichier === null ){
      setRed(true)
    }else{
      setLoadingAdd(true)
      const img_url = await handleFileUpload(fichier)
      try {
        const response = await fetch("/api/addProduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({...values,img : img_url}),
        });
    
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setOpen(false)
          setValues(prev => ({
            ...prev,
            name: '',
            qte: '',
            price: '',
            desc_b: '',
            desc_s: '',
            type: '',
            img : '',
          }))
          handleAlert({ open: true, type: true, message: "Produit ajouté avec succés" });
          GET_PRODUCT()
          setTimeout(() => handleAlert({ open: false, type: false, message: "" }), 4000);
        } else {
          handleAlert({ open: true, type: false, message: "Erreur lors l'ajout !" });
          setTimeout(() => handleAlert({ open: false, type: false, message: "" }), 4000);
        }
      } catch (error) {
        console.error("Erreur:", error);
      }finally{
        setLoadingAdd(false)
      }
    }
  }
  const handleFileUpload = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            try {
                const response = await fetch("/api/upload", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image: reader.result }),
                });

                const data = await response.json();
                if (response.ok) {
                    resolve(data.url); // ✅ Resolve the promise with the image URL
                } else {
                    reject("Image upload failed");
                }
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
    });
  };

  
  const handleValues = (e) => {
    const { name, value } = e.target;

    if (name === "qte" || name == 'price') {
      if (!isNaN(Number(value))) {
        setValues((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  useEffect(() => {
    GET_STATE();
    GET_PRODUCT();
  }, []);
  useEffect(() => {
    console.log(values);
  }, [values]);
  const onSearch = () => {
    if (search.trim() !== '') {
      setFiltredProducts(products.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      ));
    } else {
      setFiltredProducts(products);
    }
  };
  
  useEffect(() => {
    setFiltredProducts(products);
  }, [products]);
  
  useEffect(() => {
    onSearch();
  }, [search]);
  return (
    <section>
      <div className="mb-5">
        <h1 className="text-2xl sm:text-3xl font-bold mb-0">Tableau de bord</h1>
      </div>
      <div className="statistic">
        {stat.map((item, index) => {
          return (
            <Stat
              loading={loading}
              nb={item.nb}
              title={item.title}
              key={index}
              desc={item.desc}
              type={item.type}
            />
          );
        })}
      </div>
      <div className="bg-white flex flex-wrap sm:flex-nowrap justify-between mt-5 gap-5 sm:gap-0">
        <div className="flex items-center gap-1 rounded-md px-4 !border !border-gray-300 w-full sm:w-1/2 md:w-5/12  lg:w-4/12 xl:w-3/12">
          <span>
            <Search width={15} height={15} color={"gray"} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="py-2.5 px-2 outline-none text-sm"
          />
        </div>
        <button
          onClick={onOpen}
          className="text-white w-full sm:w-auto py-2.5  sm:py-0 bg-blue-500 px-4 text-sm rounded-md hover:cursor-pointer font-bold"
        >
          + Ajouter produit
        </button>
      </div>
      <div className="pt_container">
        <div className="productTable !max-h-[300px] overflow-y-auto min-w-5xl lg:min-w-auto border border-gray-300 rounded-xl relative mt-5">
          <div className="thead sticky backdrop-blur-2xl top-0 flex items-center bg-[#f1f1f1b5] px-6 py-3 rounded-t-xl">
            <div className="th w-1/12 flex  items-center text-uppercase">
              <p
                className="mb-0 text-sm"
                style={{
                  borderBottom: "none",
                  fontWeight: "500 !important",
                  color: "#666666",
                }}
              >
                id
              </p>
            </div>
            <div className="th w-3/12 flex  items-center text-uppercase">
              <p
                className="mb-0 text-sm"
                style={{
                  borderBottom: "none",
                  fontWeight: "500 !important",
                  color: "#666666",
                }}
              >
                Produit
              </p>
            </div>
            <div className="th w-2/12 flex  items-center text-uppercase">
              <p
                className="mb-0 text-sm"
                style={{
                  borderBottom: "none",
                  fontWeight: "500 !important",
                  color: "#666666",
                }}
              >
                Quantité
              </p>
            </div>
            <div className="th w-1/12 flex  items-center text-uppercase">
              <p
                className="mb-0 text-sm"
                style={{
                  borderBottom: "none",
                  fontWeight: "500 !important",
                  color: "#666666",
                }}
              >
                Prix
              </p>
            </div>
            <div className="th w-3/12 flex  items-center text-uppercase">
              <p
                className="mb-0 w-2/12 text-sm"
                style={{
                  borderBottom: "none",
                  fontWeight: "500 !important",
                  color: "#666666",
                }}
              >
                Description
              </p>
            </div>

            <div className="th flex w-1/12  items-center text-uppercase ">
              <p
                className="mb-0 text-sm"
                style={{
                  borderBottom: "none",
                  fontWeight: "500 !important",
                  color: "#666666",
                }}
              >
                Type
              </p>
            </div>
            <div className="th flex w-1/12  items-center text-uppercase ">
              <p
                className="mb-0 text-sm"
                style={{
                  borderBottom: "none",
                  fontWeight: "500 !important",
                  color: "#666666",
                }}
              >
                Supprimer
              </p>
            </div>
          </div>
          <div className="tbody">
            {loading ? (
              <div className="flex gap-2 flex-col justify-center h-64 items-center">
                <small className="text-gray-700 font-medium">Loading...</small>
              </div>
            ) : !Array.isArray(filtredProducts) || filtredProducts.length === 0 ? (
              <div className="flex gap-2 flex-col justify-center h-64 items-center">
                <NoProduct width={40} height={40} color={"black"} />
                <small className="text-gray-700 font-medium">Empty list</small>
              </div>
            ) : (
              filtredProducts.map((fav, index) => {
                return (
                  <div key={fav.id_product} className="tr flex px-6 py-2">
                    <div className="td w-1/12 flex  items-center text-uppercase">
                      <p
                        className="mb-0 text-sm"
                        style={{
                          borderBottom: "none",
                          fontWeight: "500 !important",
                          color: "#666666",
                        }}
                      >
                        #{fav.id_product}
                      </p>
                    </div>
                    <div className="td w-3/12 flex  items-center">
                      <div className="flex gap-3 border-none">
                        <img
                          src={`${fav.img}`}
                          loading="lazy"
                          alt=""
                          width={50}
                          height={50}
                          className="rounded object-cover"
                        />
                        <div>
                          <h6 className="mb-0 text-sm text-gray-700 font-semibold">
                            {fav.name}
                          </h6>
                          <p className="text-xs text-gray_text_table capitalize">
                            {fav.desc_s}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="td w-2/12 flex items-center">
                      <div className="flex items-center gap-1 text-xs text-gray_text_table mb-0">
                        <button
                          onClick={() => onChangeQTE(fav.id_product, false)}
                          className="py-1 px-2 bg-gray-200 rounded-md hover:cursor-pointer"
                        >
                          -
                        </button>
                        {fav.qte}
                        <button
                          onClick={() => onChangeQTE(fav.id_product, true)}
                          className="py-1 px-2 bg-gray-200 rounded-md hover:cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="td w-1/12 flex  items-center text-uppercase">
                      <p
                        className="mb-0 text-sm text-gray-700"
                        style={{
                          borderBottom: "none",
                          fontWeight: "500 !important",
                        }}
                      >
                        {fav.price} DA
                      </p>
                    </div>

                    <div className="td w-3/12 flex items-center">
                      <div className="max-h-[80px] overflow-y-auto scrollbar-hide">
                        <p className="mb-0 text-sm text-gray-700">
                          {fav.desc_b}
                        </p>
                      </div>
                    </div>

                    <div className="td w-1/12 flex  items-center">
                      <p
                        className="mb-0 text-sm text-blue-700 capitalize font-medium"
                        style={{
                          borderBottom: "none",
                          fontWeight: "500 !important",
                        }}
                      >
                        {fav.type}
                      </p>
                    </div>
                    <div className="td w-1/12 flex  items-center">
                      <button
                        onClick={() => DELETE(fav.id_product)}
                        className="mb-0 hover:cursor-pointer text-sm flex  justify-center items-center gap-2 rounded-md bg-red-500 text-white font-semibold px-2 py-2 text-capitalize"
                        style={{
                          borderBottom: "none",
                          fontWeight: "500 !important",
                        }}
                      >
                        <Delete width={20} height={20} color={"white"} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <Modal open={open} onClose={onClose}>
        <Box className="add_product_modal px-6 py-8 rounded-xl border-none outline-none absolute left-1/2 top-1/2 bg-white -translate-1/2 w-1/2">
          <button onClick={onClose} className="absolute hover:cursor-pointer right-5 top-5">
            <Close width={18} height={18} color={"gray"} />
          </button>
          <div>
            <h1 className="text-2xl font-bold mb-0">Ajouter Produit</h1>
            <p className={`text-sm ${red ? 'text-red-500' : 'text-[#484848]'}`}>
              il faut remplir touts les champes pour ajouter un produit
            </p>
          </div>
          <form className=" flex flex-col" onSubmit={onSubmit}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-3">
              <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                <label
                  htmlFor="name"
                  className="text-sm text-[#484848] font-medium"
                >
                  Nom de produit*
                </label>
                <input
                  value={values.name}
                  onChange={handleValues}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nom de produit"
                  className="py-2 w-full border mt-2 border-gray-300 px-2 rounded-md"
                />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                <label
                  htmlFor="desc_s"
                  className="text-sm text-[#484848] font-medium"
                >
                  Desciption courte*
                </label>
                <input
                  value={values.desc_s}
                  onChange={handleValues}
                  type="text"
                  name="desc_s"
                  id="desc_s"
                  placeholder="Desciption courte..."
                  className="py-2 w-full border mt-2 border-gray-300 px-2 rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-3">
              <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                <label
                  htmlFor="img"
                  className="text-sm text-[#484848] font-medium"
                >
                  Image de produit (jpg,png,webp)*
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(e) => setFichier(e.target.files[0])}
                  className="py-2 w-full border mt-2 border-gray-300 px-2 rounded-md"
                />

              </div>
              <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                <label
                  htmlFor="qte"
                  className="text-sm text-[#484848] font-medium"
                >
                  Quantité*
                </label>
                <input
                  value={values.qte}
                  onChange={handleValues}
                  type="text"
                  name="qte"
                  id="qte"
                  placeholder="Quantité"
                  className="py-2 w-full border mt-2 border-gray-300 px-2 rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-3">
              <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                <label
                  htmlFor="price"
                  className="text-sm text-[#484848] font-medium"
                >
                  Prix(En Dinar Algérie)*
                </label>
                <input
                  value={values.price}
                  onChange={handleValues}
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Prix de produit"
                  className="py-2 w-full border mt-2 border-gray-300 px-2 rounded-md"
                />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                <label
                  htmlFor="type"
                  className="text-sm text-[#484848] font-medium"
                >
                  Categorie de produit*
                </label>
                <select
                  value={values.type}
                  onChange={handleValues}
                  type="text"
                  name="type"
                  id="type"
                  className="py-2 border mt-2 border-gray-300 px-2 rounded-md appearance-none w-full"
                >
                  <option value={''}>Select category</option>
                  <option value="phisique">Phisique</option>
                  <option value="non phisique">Non Phisique</option>
                </select>
              </div>
            </div>
              <div className="w-full h-[150px] flex flex-col gap-0.5 mt-3">
                  <label
                    htmlFor="desc_b"
                    className="text-sm text-[#484848] font-medium"
                  >
                    Description Détaillé*
                  </label>
                  <textarea 
                  value={values.desc_b}
                  onChange={handleValues}
                  type="text"
                  name="desc_b"
                  id="desc_b"
                  placeholder="Desciption détaillé..."
                  className="py-2 w-full h-full border mt-2 border-gray-300 px-2 rounded-md"
                  />
              </div>
              <button
              disabled={
                values.name === '' ||
                values.qte === '' ||
                values.price === '' ||
                values.desc_b === '' ||
                values.desc_s === '' ||
                values.type === '' || 
                fichier === null || 
                loadingAdd
              }
              className={`w-1/2 mt-3 text-white font-medium text-sm rounded-md py-2.5
                ${values.name === '' || values.qte === '' || values.price === '' || values.desc_b === '' || values.desc_s === '' || values.type === '' || fichier === null 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                }`}
            >
              {
                loadingAdd ? 'Loading...' : 'Ajouter produit'
              }
            </button>

          </form>
        </Box>
      </Modal>
    </section>
  );
}
