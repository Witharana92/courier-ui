import { useEffect, useState }
from "react";

import api
from "../../services/api";

function BarcodePrint() {

    const [data, setData] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);



    useEffect(() => {

        load();

    }, []);



    const load =
        async () => {

            try {

                const res =
                    await api.get(
                        "/waybill/my"
                    );

                console.log(
                    "BARCODES:",
                    res.data
                );

                setData(
                    res.data
                );

            }

            catch (err) {

                console.log(
                    "ERROR:",
                    err
                );

            }

            finally {

                setLoading(
                    false
                );

            }

        };



    if (loading)
        return (

            <div className="p-10">

                Loading...

            </div>

        );



    return (

        <div className="p-8">

            <div className="
            flex
            justify-between
            items-center
            mb-8">

                <h1 className="
                text-4xl
                font-bold">

                    My Barcodes 🎟

                </h1>

            </div>



            {

                data.length === 0

                ?

                (

                    <div className="
                    bg-white
                    rounded-3xl
                    shadow
                    p-10
                    text-center">

                        No approved
                        barcodes found

                    </div>

                )

                :

                (

                    <div className="
                    grid
                    md:grid-cols-3
                    gap-5">

                        {

                            data.map(

                                x => (

                                    <div

                                        key={x.id}

                                        className="
                                        bg-white
                                        rounded-3xl
                                        shadow
                                        p-6
                                        hover:shadow-xl
                                        transition">

                                        <h2
                                        className="
                                        font-bold
                                        text-lg">

                                            {x.barcode}

                                        </h2>



                                        <p
                                        className="
                                        mt-3">

                                            Status:

                                            <span
                                            className={

                                                x.isUsed

                                                ?

                                                "text-red-500 ml-2"

                                                :

                                                "text-green-500 ml-2"

                                            }>

                                                {

                                                    x.isUsed

                                                    ?

                                                    "Used"

                                                    :

                                                    "Available"

                                                }

                                            </span>

                                        </p>



                                        <button

                                            onClick={() =>
                                                window.print()
                                            }

                                            className="
                                            bg-red-500
                                            text-white
                                            px-4
                                            py-2
                                            rounded-xl
                                            mt-5">

                                            Print

                                        </button>

                                    </div>

                                )

                            )

                        }

                    </div>

                )

            }

        </div>

    );

}

export default BarcodePrint;