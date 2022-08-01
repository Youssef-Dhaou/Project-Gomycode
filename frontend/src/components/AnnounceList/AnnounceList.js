import React from "react";
import "./AnnounceList.css";

import { useSelector } from "react-redux";
import Announce from "../Announce/Announce";
import Search from "../searchAnnounce/Search";

const AnnounceList = () => {
  const Announces = useSelector((state) => state.AnnounceReducer.Announces);
  return (
    <div>
      <div>
        <Search />
      </div>
      <div className="list">
        {Announces.map((el) => (
          <Announce key={el._id} el={el} />
        ))}
      </div>
    </div>
  );
};

export default AnnounceList;
