import { createContext } from 'react';

import APICache from './APICache';

const APICacheContext = createContext<APICache | undefined>(undefined);

export default APICacheContext;
