import Image from "next/image";
import React from "react";

const Card = (props) => {
  const { data, tinh, quan } = props;

  const tenTinh = Object.values(tinh).filter(
    (item) => data.city == item.code
  )[0].name;

  const tenquan = Object.values(quan).filter(
    (item) => data.district == item.code
  )[0].name;
  return (
    <div className="border border-red-500 flex py-4 px-2">
      {/* image */}
      <div className="w-36 h-36 aspect-square">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-full h-full object-cover"
        ></img>
      </div>

      {/* content */}
      <div className="pl-4 space-y-3 text-gray-500">
        <p className="text-red-600 font-bold">{data.title}</p>
        <p className="text-green-600 font-extrabold">
          {data.price} triệu/tháng
        </p>
        <div className="flex space-x-2">
          <p>Diện tích:</p>
          <span className=" font-medium">{data.area}m2</span>
          <p>Khu vực: </p>
          <span className="text-blue-800 font-semibold">
            {tenquan}, {tenTinh}
          </span>
        </div>
        <p>{data.content}</p>
      </div>
    </div>
  );
};

export default Card;
