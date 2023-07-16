'use client';
import useSWR from "swr";
import fetchUtil from "@/utils/fetchUtil";
import { useAuth } from "@/components/providers/AuthProvider";
import { Anton } from "next/font/google";

const anton = Anton({
    subsets: ['latin'],
    weight: '400'
});

export default function Penalties() {
    const { user } = useAuth();

    const { data: penalties, isLoading, error } = useSWR(user?.puuid, async () => {
        const res = await fetchUtil("/api/penalties");

        if(res.status >= 400) return null;

        const { penalties } = await res.json();

        return penalties;
    });

    if(!isLoading && penalties) {
        return (
            <div>
                <table className="table-auto shadow-2xl w-full max-w-6xl mx-auto text-center even:bg-slate-800 odd:bg-slate-700">
                    <tbody>
                        <tr className="even:bg-slate-800 odd:bg-slate-700">
                            <th className={`${anton.className} text-lg px-5 py-2 w-2/3`}>Expires In</th>
                            <th className={`${anton.className} text-lg px-5 py-2`}>Queues</th>
                        </tr>
                        {
                            penalties.map( (penalty, i) => {
                                const expiry = new Date(penalty.expiry);
                                return (
                                    <tr key={i} className="even:bg-slate-800 odd:bg-slate-700">
                                        <td className="py-3">{expiry.toString()}</td>
                                        <td className="py-3">{penalty?.queues?.toString()}</td>
                                    </tr>  
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    } else if (isLoading) {
        return (
            <div>
                <table className="table-auto shadow-2xl w-full max-w-6xl mx-auto text-center even:bg-slate-800 odd:bg-slate-700">
                    <tbody>
                        <tr className="even:bg-slate-800 odd:bg-slate-700">
                            <th className={`${anton.className} text-lg px-5 py-2 w-2/3`}>Expires In</th>
                            <th className={`${anton.className} text-lg px-5 py-2`}>Queues</th>
                        </tr>
                        <tr className="even:bg-slate-800 odd:bg-slate-700">
                            <td className="py-3">
                                <span className="bg-slate-500 animate-pulse px-5 py-2 rounded-md">
                                    <span className="invisible">Sun Jan 01 2023 00:00:00 GMT+0800 (Taipei Standard Time)</span>
                                </span>
                            </td>
                            <td className="py-3">
                                <span className="bg-slate-500 animate-pulse px-5 py-2 rounded-md">
                                    <span className="invisible">unrated,competitive</span>
                                </span>
                            </td>
                        </tr>
                        <tr className="even:bg-slate-800 odd:bg-slate-700">
                            <td className="py-3">
                                <span className="bg-slate-500 animate-pulse px-5 py-2 rounded-md">
                                    <span className="invisible">Sun Jan 01 2023 00:00:00 GMT+0800 (Taipei Standard Time)</span>
                                </span>
                            </td>
                            <td className="py-3">
                                <span className="bg-slate-500 animate-pulse px-5 py-2 rounded-md">
                                    <span className="invisible">unrated,competitive</span>
                                </span>
                            </td>
                        </tr>
                        <tr className="even:bg-slate-800 odd:bg-slate-700">
                            <td className="py-3">
                                <span className="bg-slate-500 animate-pulse px-5 py-2 rounded-md">
                                    <span className="invisible">Sun Jan 01 2023 00:00:00 GMT+0800 (Taipei Standard Time)</span>
                                </span>
                            </td>
                            <td className="py-3">
                                <span className="bg-slate-500 animate-pulse px-5 py-2 rounded-md">
                                    <span className="invisible">unrated,competitive</span>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    } else if (error) return <div>Error fetching penalties</div>
}