import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../Register/Register.module.css";
import styles1 from "../AddStory/AddStory.module.css";
import Button from "../Button/Button";
import Slide from "../Slide/Slide";
import slides from "../Slide/Slide.module.css";
import { useEditCardID } from "../../context/EditCardContext";
import { useUserID } from "../../context/UserIdContext";

const AddStory = ({ setShowAddStory }) => {
  const { userID, setUserId } = useUserID();
  const userId = userID;
  const { clickedEditId, setClickedEditId } = useEditCardID();

  const [slidesData, setSlidesData] = useState([
    { id: 1, heading: "", description: "", image: "", category: "" },
    { id: 2, heading: "", description: "", image: "", category: "" },
    { id: 3, heading: "", description: "", image: "", category: "" },
  ]);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [editingStory, setEditingStory] = useState(null); // State to hold the details of the story being edited

  useEffect(() => {
    document.getElementById("slidesContainer").scrollTop = 9999;
  }, [slidesData]);
  useEffect(() => {
    const fetchStoryDetails = async () => {
      try {
        console.log(clickedEditId);
        const response = await axios.get(
          `http://localhost:8000/api/v1/story/${clickedEditId}`
        ); // Replace URL_TO_FETCH_STORY_DETAILS with the actual endpoint
        const storyDetails = response.data;
        setEditingStory(storyDetails);
        // Autofill the first slide with story details
        setSlidesData([
          {
            ...slidesData[0],
            heading: storyDetails.header,
            description: storyDetails.description,
            image: storyDetails.img,
            category: storyDetails.type,
          },
          slidesData[1],
          slidesData[2],
        ]);
      } catch (error) {
        console.error("Error fetching story details:", error);
      }
    };

    fetchStoryDetails();
  }, []);

  const handleClose = () => {
    console.log("clicked close")
    setShowAddStory(false);
    setClickedEditId(false);
  };

  const handleSlideChange = (event, field) => {
    const updatedSlides = slidesData.map((slide) => {
      if (slide.id === currentSlide) {
        return { ...slide, [field]: event.target.value };
      }
      return slide;
    });
    setSlidesData(updatedSlides);
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSlidesData((prevSlides) =>
      prevSlides.map((slide) => ({
        ...slide,
        category: selectedCategory,
      }))
    );
  };

  const handleAddSlide = () => {
    if (slidesData.length < 6) {
      const newSlideId = slidesData.length + 1;
      // Get the category from the current slide
      const currentCategory = slidesData[currentSlide - 1].category;
      setSlidesData([
        ...slidesData,
        {
          id: newSlideId,
          heading: "",
          description: "",
          image: "",
          category: currentCategory,
        },
      ]);
      setCurrentSlide(newSlideId); // Set the current slide to the newly added slide
    } else {
      toast.error("Maximum 6 slides allowed");
    }
  };

  const handlePrevious = () => {
    setCurrentSlide(Math.max(currentSlide - 1, 1));
  };

  const handleNext = () => {
    setCurrentSlide(Math.min(currentSlide + 1, 6));
  };

  const handlePost = () => {
    if (editingStory) {
      const editedSlide = slidesData[0];
      const patchData = {
        img: editedSlide.image,
        header: editedSlide.heading,
        description: editedSlide.description,
        type: editedSlide.category.toLowerCase(),
      };
      axios
        .patch(
          `http://localhost:8000/api/v1/story/users/${userId}/${clickedEditId}`,
          patchData
        )
        .then((response) => {
          setClickedEditId(null);
          console.log("Slide updated:", response.data);
          toast.success("Slide updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating slide:", error);
          toast.error("Error updating slide. Please try again later.");
        });
    } else {
      const isEmptyField = slidesData.some((slide) => {
        return (
          slide.heading.trim() === "" ||
          slide.description.trim() === "" ||
          slide.image.trim() === "" ||
          slide.category.trim() === ""
        );
      });
      if (isEmptyField) {
        toast.error("Please fill in all fields for each slide.");
        return;
      }
      slidesData.forEach((slide) => {
        const postData = {
          img: slide.image,
          header: slide.heading,
          description: slide.description,
          type: slide.category.toLowerCase(),
        };
        axios
          .post(
            `http://localhost:8000/api/v1/story/post-story/${userId}`,
            postData
          )
          .then((response) => {
            setShowAddStory(false);
            console.log("Slide posted:", response.data);
            toast.success("Slide posted successfully!");
          })
          .catch((error) => {
            console.error("Error posting slide:", error);
            toast.error("Error posting slide. Please try again later.");
          });
      });
    }
  };

  const handleCloseSlide = (index) => {
    console.log(index);
    console.log(slidesData);
    const updatedData = slidesData.filter((slide) => slide.id !== index);
    const updatedSlides = updatedData.map((slide, i) => ({
      ...slide,
      id: i + 1,
    }));
    console.log(updatedSlides);
    setSlidesData(updatedSlides);
    if (updatedSlides.length >= index) {
      setCurrentSlide(index);
    } else {
      setCurrentSlide(updatedSlides.length);
    }
    console.log("close button");
  };

  return (
    <div className={styles1.modal}>
      <div className={styles1.container}>
        <div className={styles1.insideDiv}>
          <button className={styles1.closeButton} onClick={handleClose}>
            &times;
          </button>
          <div className={styles1.addText}>Add up to 6 slides</div>
          <div id="slidesContainer" className={styles1.slides}>
            {slidesData.map((slide, index) => (
              <Slide
                key={slide.id}
                number={slide.id}
                onClick={() => setCurrentSlide(slide.id)}
                onClose={() => handleCloseSlide(slide.id)}
                showCloseButton={index >= 3}
              />
            ))}

            {slidesData.length < 6 && (
              <div className={slides.container} onClick={handleAddSlide}>
                Add+
              </div>
            )}
          </div>
          <div className={styles1.p}>
            <div className={styles1.allInputs}>
              <div className={styles1.inputs}>
                <label className={styles1.label} htmlFor="heading">
                  Heading:
                </label>
                <input
                  className={styles.input}
                  id="heading"
                  type="text"
                  placeholder="Your heading"
                  value={
                    (slidesData[currentSlide - 1] &&
                      slidesData[currentSlide - 1].heading) ||
                    ""
                  }
                  onChange={(event) => handleSlideChange(event, "heading")}
                />
              </div>
              <div className={styles1.inputs}>
                <label className={styles1.label} htmlFor="description">
                  Description:
                </label>
                <textarea
                  className={styles1.textarea}
                  id="description"
                  placeholder="Story Description"
                  value={
                    (slidesData[currentSlide - 1] &&
                      slidesData[currentSlide - 1].description) ||
                    ""
                  }
                  onChange={(event) => handleSlideChange(event, "description")}
                />
              </div>
              <div className={styles1.inputs}>
                <label className={styles1.label} htmlFor="image">
                  Image:
                </label>
                <input
                  className={styles.input}
                  id="image"
                  type="text"
                  placeholder="Add Image url"
                  value={
                    (slidesData[currentSlide - 1] &&
                      slidesData[currentSlide - 1].image) ||
                    ""
                  }
                  onChange={(event) => handleSlideChange(event, "image")}
                />
              </div>
              <div className={styles1.inputs}>
                <label className={styles1.label} htmlFor="category">
                  Category:
                </label>
                <select
                  className={styles1.select}
                  id="category"
                  value={
                    (slidesData[currentSlide - 1] &&
                      slidesData[currentSlide - 1].category) ||
                    ""
                  }
                  onChange={handleCategoryChange}
                >
                  <option value="">Select category</option>
                  <option value="medical">Medical</option>
                  <option value="fruits">Fruits</option>
                  <option value="world">World</option>
                  <option value="india">India</option>
                </select>
              </div>
            </div>
            <p className="p">
              This field will be <br /> the same for all slides
            </p>
          </div>
          <div className={styles1.btns}>
            <div className={styles1.btn1}>
              <Button
                name={"Previous"}
                color={"#7EFF73"}
                handleClick={handlePrevious}
              />
              <Button
                name={"Next"}
                color={"#73ABFF"}
                handleClick={handleNext}
              />
            </div>
            <div>
              <Button
                name={"Post"}
                color={"#FF7373"}
                handleClick={handlePost}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AddStory;
