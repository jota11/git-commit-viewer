import Image from "next/image";
import Link from "next/link";
import { globalConfigs } from "config";

const Header: React.FC = () => {
    const configSetColor = globalConfigs.nameColor;

    if (globalConfigs.logo == "") {
        return (
            <header className="center">
                <section>
                    <Link href="/">
                        <a>
                            <h1 style={{ color: configSetColor }}>{globalConfigs.name}</h1>
                        </a>
                    </Link>
                </section>
            </header>
        )
    } else {
        return (
            <header className="center">
                <section>
                    <Link href="/">
                        <a>
                            <Image src={globalConfigs.logo} width="500px" height="100%" alt={globalConfigs.name + "'s logo"} />
                        </a>
                    </Link>
                </section>
            </header>
        )
    }
}

export default Header
