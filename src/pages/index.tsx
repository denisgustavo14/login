"use client"

import React, { useEffect } from "react";
import classNames from "classnames";
import { Geist } from "next/font/google";
import Image from "next/image";
import { ChangeEvent, useCallback, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({
    user: "",
    password: "",
  });

  const handleInput = useCallback(({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }, []);

  const handleSend = useCallback(async() => {
    console.info(form);
    try {
      const res = await fetch("/api/v1/employees/createEmployee/", {
        method: "POST",
        body: JSON.stringify({
          "firstName": "Maciel",
          "midName": "Marilyn",
          "fatherLastName": "Garcia",
          "motherLastName": "Mendez",
          "age": 37,
          "gender": "FEMALE",
          "birthdate": "1988-04-20",
          "position": "Tech Lead"
        }),
        headers: {"Content-type": "application/json"}
      });
  
      const data = await res.json();
      console.info(data);
    } catch (error) {
      console.error(error);
      console.error("Ramon es puto");
    }
  }, [form]);

  useEffect(() => {
    const init = async () => {
      const res = await fetch("/api/v1/employees/");
      const data = await res.json();
      console.info(data);
    }

    init();
  }, [])

  return (
    <div
      className={classNames(
        geistSans.className,
        "flex items-center justify-center",
        "w-full h-svh",
        "bg-gradient-to-br from-green-300 via-teal-300 to-cyan-300"
      )}
    >
      <div
        className={classNames(
          "bg-white/45 min-w-[20rem]",
          "flex flex-col",
          "gap-y-3 p-4",
          "rounded-lg"
        )}
        style={{
          cursor: "url('/pene.cur'), auto",
        }}
      >
        <div className="text-center">
          <h6
            className="text-[1.2rem] font-[700]"
            onMouseOver={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
          >
            Login
          </h6>
          <div
            className={classNames("flex items-center justify-center gap-x-2", {
              "opacity-0": !isVisible,
            })}
          >
            <p>Ramon le gusta el pene</p>
            <Image
              src="/pene.png"
              alt="pene"
              width={30}
              height={30}
              className="rotate-180"
            />
          </div>
        </div>
        <label className="flex flex-col">
          user:
          <input
            name="user"
            value={form.user}
            onChange={handleInput}
            className={classNames("border border-gray-700", "rounded-full")}
          />
        </label>
        <label className="flex flex-col">
          password:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInput}
            className={classNames("border border-gray-700", "rounded-full")}
          />
        </label>
        <button
          className={classNames(
            "rounded-full",
            "bg-teal-700",
            "px-2 py-1 text-white",
          )}
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
