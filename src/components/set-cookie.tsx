"use client";

import { useCookies } from "next-client-cookies";
import { useEffect } from "react";

export default function SetCookie({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  const cookies = useCookies();

  useEffect(() => {
    cookies.set(name, value);
  }, []);

  return null;
}
