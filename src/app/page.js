"use client";
import Image from "next/image";
import tinh from "../../data/tinh_tp.json";
import quan from "../../data/quan_huyen.json";
import { useState } from "react";
import Card from "./components/Card";
import dataList from "../../data/data.json";
export default function Home() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedQuan, setSelectedQuan] = useState("");
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedArea, setSelectedArea] = useState(0);
  const [response, setResponse] = useState(dataList);
  // LỌC DATA THEO ĐIỀU KIỆN
  function handleFilter() {
    const newresponse = dataList.filter(
      (item) =>
        (item.city === selectedCity) &
        (item.district === selectedQuan) &
        (item.price >= selectedPrice[0]) &
        (item.price <= selectedPrice[1]) &
        (item.area >= selectedArea[0]) &
        (item.area <= selectedArea[1])
    );
    setResponse(newresponse);
  }

  const districList = Object.values(quan).filter(
    (item) => selectedCity == item.parent_code
  );

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const mucgia = [
    { text: "Dưới 1 triệu", value: [0, 1000000] },
    { text: "1 triệu - 2 triệu", value: [1000000, 2000000] },
    { text: "2 triệu - 3 triệu", value: [2000000, 3000000] },
    { text: "3 triệu - 5 triệu", value: [3000000, 5000000] },
    { text: "5 triệu - 7 triệu", value: [5000000, 7000000] },
    { text: "7 triệu - 10 triệu", value: [7000000, 10000000] },
    { text: "10 triệu - 15 triệu", value: [10000000, 15000000] },
  ];
  const dientich = [
    { text: "Dưới 20m2", value: [0, 20] },
    { text: "20 m2 - 30 m2", value: [20, 30] },
    { text: "30 m2 - 40 m2", value: [30, 40] },
    { text: "40 m2 - 50 m2", value: [40, 50] },
    { text: "50 m2 - 60 m2", value: [50, 60] },
    { text: "60 m2 - 70 m2", value: [60, 70] },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <div className="container py-20">
        {/* Filters */}
        <div className="bg-yellow-500/50 rounded p-4 flex justify-start space-x-2 ">
          {/* Tỉnh thành */}
          <div>
            <p className="font-semibold">Tỉnh thành</p>
            <select
              className="py-2"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option>Chọn Tỉnh/thành</option>
              {Object.values(tinh).map((item, index) => {
                return (
                  <option key={index} value={item.code}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Quận huyện */}
          <div>
            <p className="font-semibold">Quận huyện</p>
            <select
              className="py-2"
              onChange={(e) => setSelectedQuan(e.target.value)}
            >
              <option>--Quận/huyện--</option>
              {districList.map((item, index) => {
                return (
                  <option key={index} value={item.code}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Khoảng giá */}
          <div>
            <p className="font-semibold">Khoảng giá</p>
            <select
              className="py-2"
              onChange={(e) => setSelectedPrice(e.target.value.split(","))}
            >
              <option value="">Chọn khoảng giá</option>
              {mucgia.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>
          {/* Diện tích */}
          <div>
            <p className="font-semibold">Diện tích</p>
            <select
              className="py-2"
              onChange={(e) => setSelectedArea(e.target.value.split(","))}
            >
              <option value="">Chọn diện tích</option>
              {dientich.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>
          {/* BUtton */}
          <div className="">
            <button
              onClick={handleFilter}
              className="py-2 mt-[22px] bg-orange-400 rounded px-6 text-white font-semibold hover:bg-orange-200 "
            >
              Lọc tin
            </button>
          </div>
        </div>

        {/* List */}
        <div className="max-w-5xl mx-auto">
          {response.map((item, index) => (
            <Card key={index} data={item} tinh={tinh} quan={quan}></Card>
          ))}
        </div>
      </div>
    </main>
  );
}
