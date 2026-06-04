import { useEffect } from "react";

export default function usePageTitle(value: string) {
    const title = "WorldWise";
    useEffect(() => {
        document.title = `${title} | ${value}`;
        return () => {
            document.title = title;
            console.log(`Cleanup effect for movie ${title}`);
        };
    }, [title, value]);
}
