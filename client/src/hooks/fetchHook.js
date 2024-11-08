import axios from "axios";
import { useEffect, useState } from "react";
// import useAxiosPrivate from "./useAxiosPrivate";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
const useFetch = (path, options = {}) => {

//   const privateAxios = useAxiosPrivate();
  const { skip } = options;
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });
  const [Params, setParams] = useState("");

  useEffect(() => {
    let isMounted = true;

    if (skip) {
      return;
    }

    const fetchData = async () => {
      try {
        console.log('called...')
        setData((prev) => ({ ...prev, isLoading: true }));

        const { data, status } = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/${path}`, {
          params: Params,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        });
        if (isMounted) {
          if (status === 200) {
            setData((prev) => ({
              ...prev,
              isLoading: false,
              apiData: data,
              status: status,
            }));
          } else if (status !== 200) {
            setData((prev) => ({ ...prev, isLoading: true }));
          }
        }
      } catch (error) {
        if (isMounted) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
            serverError: error,
          }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [path, Params, skip]);

  return [getData, setData, setParams, Params];
};

export default useFetch;
