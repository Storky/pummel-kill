import data from 'engine/data/mordstats.json';
import {TWeaponItem, TMordstatsData} from 'engine/data/mordstats-data.types';

export const convertMordstatsDataToArray = (data: TMordstatsData): TWeaponItem[] => Object.entries(data).map(
    ([name, weapon]) => ({ name, ...weapon })
);

export const allWeapons: TWeaponItem[] = convertMordstatsDataToArray(data);

