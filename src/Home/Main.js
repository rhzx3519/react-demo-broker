import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Main.css';
import Header from "./header/Header";
import { Verify } from "../API/AuthAPI";

const Main = (props) => {
    const { user, setUser } = props

    const navigate = useNavigate()

    useEffect(() => {
        // Fetch the user email and token from local storage
        const localUser = JSON.parse(localStorage.getItem("user"))
        if (!localUser || !localUser.token) {
            setUser(null)
            // navigate('/')
            return
        }

        (async function(){
            const status= await Verify(localUser.token)
            if (status === 200) {
                setUser(localUser)
                return
            }
            // navigate('/')
        })()

    }, [])

    return <section>
        <Header user={user} setUser={setUser} />

        <div id="body" className={"body"}>
            <article>
                <h2>First article</h2>

                <p>Tacos actually microdosing, pour-over semiotics banjo chicharrones retro fanny pack portland everyday carry vinyl typewriter. Tacos PBR&B pork belly, everyday carry ennui pickled sriracha normcore hashtag polaroid single-origin coffee cold-pressed. PBR&B tattooed trust fund twee, leggings salvia iPhone photo booth health goth gastropub hammock.</p>
            </article>

            <article>
                <h2>Second article</h2>

                <p>Tacos actually microdosing, pour-over semiotics banjo chicharrones retro fanny pack portland everyday carry vinyl typewriter. Tacos PBR&B pork belly, everyday carry ennui pickled sriracha normcore hashtag polaroid single-origin coffee cold-pressed. PBR&B tattooed trust fund twee, leggings salvia iPhone photo booth health goth gastropub hammock.</p>
            </article>

            <article>
                <div>
                    <button>Smile</button>
                    <button>Laugh</button>
                    <button>Wink</button>
                    <button>Shrug</button>
                    <button>Blush</button>
                </div>
                <div>
                    <p>Tacos actually microdosing, pour-over semiotics banjo chicharrones retro fanny pack portland everyday carry vinyl typewriter. Tacos PBR&B pork belly, everyday carry ennui pickled sriracha normcore hashtag polaroid single-origin coffee cold-pressed. PBR&B tattooed trust fund twee, leggings salvia iPhone photo booth health goth gastropub hammock.</p>
                </div>
                <div>
                    <p>Cray food truck brunch, XOXO +1 keffiyeh pickled chambray waistcoat ennui. Organic small batch paleo 8-bit. Intelligentsia umami wayfarers pickled, asymmetrical kombucha letterpress kitsch leggings cold-pressed squid chartreuse put a bird on it. Listicle pickled man bun cornhole heirloom art party.</p>
                </div>
            </article>
        </div>

    </section>
}

export default Main