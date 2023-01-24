import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [load, setLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  let baseUrl = "https://api.unsplash.com/photos/";
  let searchUrl = "https://api.unsplash.com/search/photos/";
  let urlKey = "?client_id=z6X0yeB-zuzhWRwwtfjbiLCkcycNgFPOXrDrAk3TU94";
  let urlPage = `&page=${page}`;

  let url = `${baseUrl}${urlKey}${urlPage}`;

  if (query) {
    url = `${searchUrl}${urlKey}${urlPage}&query=${query}`;
    console.log(url);
  }

  const fetchData = async () => {
    if (load) {
      const result = await fetch(url);
      const finalResult = await result.json();
      console.log(finalResult);
      setPhotos((previousPhotos) => {
        if (query) {
          console.log(finalResult.results);
          return [...previousPhotos, ...finalResult.results];
        } else {
          return [...previousPhotos, ...finalResult];
        }
      }); // photos
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("hi", url);
  }, [photos, page]);

  const LoadMore = () => {
    setPage(page + 1);
    setLoad(true);

    console.log("hello");
  };

  return (
    <div className="App">
      <div className="img_title">
        <p>
          unsplash - API - Project <br />
        </p>
        <div className="search">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/151/151773.png"
            alt=""
            onClick={LoadMore}
          />
          <button className="btn" onClick={LoadMore}>
            Load More
          </button>
        </div>
      </div>
      <div className="photos">
        {photos.map((photo) => {
          return (
            <div className="single_img" key={photo.id}>
              <img src={photo.urls.regular} alt="" />
              <p className="user_name">
                By : {photo.user.name}
                <br />
                <img
                  src="https://cdn-icons-png.flaticon.com/128/686/686370.png"
                  alt=""
                />
                {photo.likes} Likes
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
