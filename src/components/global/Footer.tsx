import Image from "next/image";
import Link from "next/link";
import { globalConfigs } from "config";

const Footer: React.FC = () => {
    const configSetColor = globalConfigs.nameColor;
    // TODO: Should this be locked to only allow hex values as colors?
    // let styleColor: string;
    // if (configSetColor.startsWith("#")) {
    //     styleColor = configSetColor;
    // } else {
    //     styleColor = "";
    //     do things?
    // }

    if (globalConfigs.logoSquared == "") {
        return (
            <footer className="center">
                <Link href="/">
                    <a>
                        <h6 style={{ color: configSetColor }}>{globalConfigs.name} and some more text</h6>
                    </a>
                </Link>
            </footer>
        )
    } else {
        return (
            <footer className="center">
                <Link href="/">
                    <a>
                        <Image src={globalConfigs.logoSquared} width="500px" height="100%" alt={globalConfigs.name + "'s logo"} />
                    </a>
                </Link>
            </footer>
        )
    }
}

export default Footer
