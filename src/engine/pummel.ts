
import data from 'engine/data/mordstats.json';
import { TMeleeWeaponItem, TMeleeAttack} from 'engine/data/mordstats-data.types';
import {filteredAttacksMapper, wDamageFilter} from 'engine/pummel/pummel.mappers';
import {allWeapons} from 'engine/data/mordstats-data.helpers';

const LS_DMG: number[] = [
    53,38,60,45,61,41,26
];









function getNumbersTo1Dmg(): number[] {
    const lsDmgRests: number[] = LS_DMG.map((dmg)=> 100 - 1 -dmg);

    console.log(123,data);


    const onlyDuelWeapons: TMeleeWeaponItem[] = allWeapons.filter(
        (w)=>{
            return !w.peasantOnly && !w.isMisc && (w.type === 'melee')
        }
    ) as TMeleeWeaponItem[];

    const weaponsPummelDamages = onlyDuelWeapons.map(w => {

        const filteredAttacks = w.attacks.map((a: TMeleeAttack) => {
            // console.log(a);
            // DESC: filtered_damages
            const ft: { [key: string]: number[] | null } = {};
            ft['head'] = wDamageFilter(a.damage.head, [1,2], LS_DMG);
            ft['torso'] = wDamageFilter(a.damage.torso, [1,2], LS_DMG);
            ft['legs'] = wDamageFilter(a.damage.legs, [1,2], LS_DMG);

            const pummelDamages = Object.fromEntries(Object.entries(ft).filter(([_, arr]) => !!arr));

            return {
                pummelDamages,
                type: a.type,
            };
        }).filter(a => Object.keys(a.pummelDamages).length);

        const attacks = filteredAttacksMapper(filteredAttacks);

        return attacks.length ? {
            name: w.name,
            attacks: attacks,
        } : null;
    }).filter(w => !!w);

    console.log(111, weaponsPummelDamages);
    console.log('onlyDuelWeapons', onlyDuelWeapons);

    return LS_DMG.map((dmg)=> 100 - 1 -dmg);
}

 export default getNumbersTo1Dmg
