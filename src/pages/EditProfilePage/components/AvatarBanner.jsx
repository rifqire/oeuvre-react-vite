import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import FileUploadButton from "../../../shared/components/FileUploadButton"
import { Button, Tabs } from "flowbite-react"
import { updateImage } from "../../../redux/features/profileSlice"

export default function AvatarBanner() {
  const [formData, setFormData] = useState({})
  const { state } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedAvatar, setSelectedAvatar] = useState(null)

  console.log("STATE", state)

  useEffect(() => {
    if (state !== null) {
      setFormData({
        userId: state.artist.id,
      })
      console.log("Artist ID", state.artist.id)
    }
  }, [state])

  const handleChange = (event) => {
    setSelectedAvatar(event.target.files[0])
    console.log("Selected File", event.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedAvatar) {
      alert("Please upload an image!")
      return
    }
    try {
      const data = new FormData()
      console.log("Selected Avatar", selectedAvatar)
      data.append("user", JSON.stringify(formData))
      data.append("image", selectedAvatar)
      console.log("Form Data", data)
      const action = updateImage(data)
      await dispatch(action).unwrap()
      navigate("/my-store")
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <div className="bg-fixed flex justify-center items-center min-h-screen bg-[url('https://images.unsplash.com/photo-1482160549825-59d1b23cb208?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-gray-400 bg-blend-multiply">
      <div className="mt-40 mb-20 w-full max-w-lg bg-white border border-gray-200 p-12 justify-center items-center rounded-3xl">
        <Tabs variant="fullWidth">
          <Tabs.Item active title="Avatar">
            <h1 className="xxl-semibold-black text-center mt-3">Edit Avatar</h1>
            <form
              className="flex w-full flex-col gap-4 pt-6 px-4"
              onSubmit={handleSubmit}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="bg-slate-100 w-40 h-40 rounded-full"></div>
              </div>
              <FileUploadButton
                id="imagePicture"
                label="Upload Avatar"
                helper="Upload your picture with a smile!"
                onChange={handleChange}
              />
              <Button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-xl"
              >
                Submit
              </Button>
            </form>
          </Tabs.Item>
          <Tabs.Item title="Banner">
            <h1 className="xxl-semibold-black text-center mt-3">Edit Banner</h1>
            <form
              className="flex w-full flex-col gap-4 pt-6 px-4"
              onSubmit={handleSubmit}
            >
              <div className="bg-slate-100 w-full h-48 rounded-lg"></div>

              <FileUploadButton
                id="imageBanner"
                label="Upload Banner"
                helper="This will be used for the banner on your profile."
                onChange={handleChange}
              />
              <Button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-xl"
              >
                Submit
              </Button>
            </form>
          </Tabs.Item>
        </Tabs>
      </div>
    </div>
  )
}
