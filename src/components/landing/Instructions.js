import { Anton } from "next/font/google";

const anton = Anton({
    subsets: ['latin'],
    weight: '400'
});

export default function Instructions() {
    return (
        <section id="instructions" className="p-10">
            <h1 className={`${anton.className} text-red-500 text-4xl mb-5`}>Instructions</h1>
            <ol className="text-white text-lg list-decimal list-inside" type="number">
                <li>Go to this <a target="_blank" href="https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1" className="text-red-500 hover:underline">link</a>. If you are not yet signed in, sign in with your Riot Account.</li>
                <li>After signing in, you will be redirected to a new URL. Copy this URL from your browser.</li>
                <li>Paste the URL in the input box above, then click <span className="text-red-500">Authorize</span>.</li>
            </ol>
        </section>
    );
}