import React, { useEffect, useState } from "react"
import CardPictureTileSmall from "../../../shared/components/CardPictureTileSmall"
import {
  fetchMerchandises,
  fetchProductsByNameCategoryAndType,
} from "../../../redux/features/productSlice"
import { useDispatch, useSelector } from "react-redux"
import convertEnum from "../../../constants/convertEnum"
import TextInputForm from "../../../shared/components/TextInputForm"
import { Accordion, Label, Radio } from "flowbite-react"
import Animation from "../../../assets/nothing.json"
import EmptyContentSmall from "../../../shared/components/EmptyContentSmall"
import TextButton from "../../../shared/components/TextButton"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import categories from "../../../constants/categories"
import types from "../../../constants/types"

export default function DiscoverProductList({ artist, merchandises, review }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const { paging: totalPages } = useSelector((state) => state.merchandises)
  const { isLoggedIn } = useAuth()
  const { state } = useLocation()

  useEffect(() => {
    if (state) {
      const { category } = state
      dispatch(
        fetchProductsByNameCategoryAndType({
          productName: "",
          category: category,
          type: "",
          page: currentPage,
        })
      )
    } else {
      dispatch(
        fetchProductsByNameCategoryAndType({
          productName: "",
          category: "",
          type: "",
          page: currentPage,
        })
      )
    }
    window.scrollTo(0, 0)
  }, [dispatch, currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const [form, setForm] = useState({
    search: "",
    category: "",
    type: "",
  })

  const resetSearchFilter = () => {
    setForm({
      search: "",
      category: "",
      type: "",
    })
    dispatch(fetchMerchandises({ page: currentPage }))
  }

  const handleKeyboardChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
    console.log(form)
  }

  const handleCategoryChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
    console.log("SELECTED RADIO (CATEGORY):", form.category)
  }

  // Handling types
  const handleTypeChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
    console.log("SELECTED RADIO (TYPE):", form.type)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (form.search === "" && form.category === "" && form.type === "") {
      alert("Please type something or select a filter!")
    } else {
      dispatch(
        fetchProductsByNameCategoryAndType({
          productName: form.search,
          category: form.category,
          type: form.type,
          page: currentPage,
        })
      )
      console.log(
        "Name:",
        form.search,
        "Category:",
        form.category,
        "Type:",
        form.type
      )
    }
  }

  return (
    <div className="container mx-auto pt-28 pb-8">
      <div className="flex flex-row justify-center mx-10">
        <div className="w-1/4 mx-5 flex flex-col rounded-lg">
          <form className="flex flex-col" onSubmit={handleSearch}>
            <TextInputForm
              type="text"
              id="search"
              name="search"
              placeholder="Search items..."
              onChange={handleKeyboardChange}
              value={form.search}
            />
            <Accordion className="bg-white mb-4">
              <Accordion.Panel>
                <Accordion.Title>Filter by category:</Accordion.Title>
                <Accordion.Content>
                  <fieldset className="flex max-w-md flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <Radio
                        id=""
                        name="category"
                        value=""
                        defaultChecked
                        onChange={handleCategoryChange}
                      />
                      <Label htmlFor="">All Categories</Label>
                    </div>
                    {categories.map(({ text, category }) => (
                      <div className="flex items-center gap-2" key={category}>
                        <Radio
                          id={category}
                          name="category"
                          value={category}
                          onChange={handleCategoryChange}
                        />
                        <Label htmlFor={category}>{text}</Label>
                      </div>
                    ))}
                  </fieldset>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>Filter by type:</Accordion.Title>
                <Accordion.Content>
                  <fieldset className="flex max-w-md flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <Radio
                        id=""
                        name="type"
                        value=""
                        defaultChecked
                        onChange={handleTypeChange}
                      />
                      <Label htmlFor="">All Types</Label>
                    </div>
                    {types.map(({ text, type }) => (
                      <div className="flex items-center gap-2" key={type}>
                        <Radio
                          id={type}
                          name="type"
                          value={type}
                          onChange={handleCategoryChange}
                        />
                        <Label htmlFor={type}>{text}</Label>
                      </div>
                    ))}
                  </fieldset>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
            <TextButton
              id="searchBtn"
              btnName="Search Results"
              onClick={handleSearch}
              btnColor="bg-indigo-500"
              textColor="text-white"
              hoverColor="bg-indigo-700"
            />
            <TextButton
              id="resetBtn"
              btnName="Reset Search"
              onClick={resetSearchFilter}
              btnColor="bg-indigo-500"
              textColor="text-white"
              hoverColor="bg-indigo-700"
            />
          </form>
        </div>
        <div className="w-3/4 flex flex-col ps-4">
          <div className="flex flex-col">
            <h1 className="xl-semibold-black">
              {isLoggedIn && artist.firstName
                ? `Hello, ${artist.firstName}!`
                : isLoggedIn && artist.firstName === null
                ? "Hello, user!"
                : "Hello, guest!"}
            </h1>
            <p className="md-gray mb-6">
              Here are our best selection of products to choose.
            </p>
          </div>
          {merchandises.length === 0 ? (
            <EmptyContentSmall
              title={"Nothing to show here..."}
              middleText={
                "Try changing your filters or reset your search first, to make sure the product you want is available."
              }
              lowerText={"Or perhaps, there's nothing to sell in here..."}
              animation={Animation}
            />
          ) : (
            <div className="grid grid-cols-4 grid-rows-1 gap-3 mb-5">
              {merchandises.map((merchandise) => (
                <CardPictureTileSmall
                  key={merchandise.id}
                  image={
                    merchandise.image
                      ? merchandise.image.path
                      : "https://ik.imagekit.io/muffincrunchy/oeuvre-images/user-picture/default_picture.jpg"
                  }
                  category={convertEnum[merchandise.category]}
                  name={merchandise.name}
                  seller={merchandise.user.displayName}
                  productStock={merchandise.stock}
                  price={merchandise.price}
                  onClick={() => {
                    navigate("/product-detail", {
                      state: {
                        artist: artist,
                        merchandise: merchandise,
                        review: review,
                      },
                    })
                  }}
                />
              ))}
            </div>
          )}
          <div className="flex flex-row gap-2 mt-6 justify-end">
            {[...Array(totalPages.totalPages)].map((_, index) => (
              <div
                className={
                  currentPage === index + 1
                    ? `p-2 cursor-pointer rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold`
                    : `p-2 cursor-pointer rounded-lg bg-white hover:bg-gray-100 text-gray-600`
                }
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
