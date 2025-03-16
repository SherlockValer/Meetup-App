import { useState, useEffect } from "react";
const useFetchEventData = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [url]);
    return { data, loading, error };
};
export default useFetchEventData;