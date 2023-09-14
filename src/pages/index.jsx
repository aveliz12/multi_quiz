import Layout from "@/components/Layout";
import styleIndex from "../styles/index.module.scss";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <div className={styleIndex.row}>
        <div className={styleIndex.area}>
          <ul className={styleIndex.circles}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className={styleIndex.context}>
          <div className={styleIndex.image}>
            <Image
              src="/images/logo_juego.png"
              alt="MULTIQUIZ"
              width={330}
              height={280}
            />
          </div>
          <h1 className={styleIndex.h1}>Demuestra cuánto sabes!</h1>
        </div>
      </div>
      <div>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          SEGUNDA PARTE
        </h1>
      </div>
    </Layout>
  );
}
