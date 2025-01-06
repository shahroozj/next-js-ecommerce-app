import { unstable_cache as nextCache} from "next/cache";
import { cache as reactCache} from "react";

//because we want to use both nextCaching and reactCache, we need to create a cache object extending the both.
type Callback = (...args: any[]) => Promise<any>;
export function cache<T extends Callback>(cb: T, keyParts: string[], options:{ revalidate?: number | false; tags?: string[]} = {}){
    return nextCache(reactCache(cb), keyParts, options);
}

