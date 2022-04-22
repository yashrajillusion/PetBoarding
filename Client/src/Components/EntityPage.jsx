import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const EntityPage = () => {
  const { data, city } = useSelector((store) => store.entity);
  const [current, setCurrent] = useState({});
  const { id } = useParams();
  useEffect(() => {
    let obj = data.filter((el) => el.id == id);
    setCurrent(obj[0]);
  }, []);
  console.log(current);
  return (
    <div className="entity-cont">
      <div>
        <p>About</p>
        <p>{current.name}</p>
      </div>
      <div>
        <p>Number of pets that will be watched at one time.</p>
        <p>{current.capacity}</p>
      </div>
      <div>
        <p>Accepted Pet Types</p>
        <p>{current.types}</p>
      </div>
      <div>
        <p>Accepted Pet size</p>
        <p>{current.size}</p>
      </div>
      <div>
        <p>Level of adult supervision.</p>
        <p>{current.supervision}</p>
      </div>
      <div>
        <p>The place your pet will be if they are left unsupervised at home.</p>
        <p>{current.unsepervised}</p>
      </div>
      <div>
        <p>The place your pet will sleep at night.</p>
        <p>{current.sleepPlace}</p>
      </div>
      <div>
        <p>The number of potty breaks provided per day.</p>
        <p>{current.poty}</p>
      </div>
      <div>
        <p>The number of walks provided per day.</p>
        <p>{current.walks}</p>
      </div>
      <div>
        <p>The type of home I stay in.</p>
        <p>{current.typeofhome}</p>
      </div>
      <div>
        <p>My outdoor area size.</p>
        <p>{current.outdoor}</p>
      </div>
      <div>
        <p>Emergency transport.</p>
        <p>{current.emergency}</p>
      </div>
      <div>
        <p>Summary</p>
        <p>{current.summary}</p>
      </div>
    </div>
  );
};
