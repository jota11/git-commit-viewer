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
                    <h6 style={{ color: configSetColor }}>{globalConfigs.name} Commits and some more text</h6>
                </Link>
            </footer>
        )
    } else {
        return (
            <footer className="center">
                <Link href="/">
                    <Image src={globalConfigs.logoSquared} width={500} height={500} alt={globalConfigs.name + "'s logo"} />
                </Link>
            </footer>
        )
    }
}

export default Footer
