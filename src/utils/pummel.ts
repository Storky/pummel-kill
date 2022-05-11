
import data from './mordstats.json';

const LS_DMG: number[] = [
    53,38,60,45,61,41,26
];


type TShield = {
    type: string,
    general: {
        parryDrainNeg:number,
        turnCapX:number,
        turnCapY:number,
        wallTurnCapX:number,
        wallTurnCapY:number,
        bMoveRest:number,
        blockHeld:string,
        moveRest:number,
    },
}

type TRangedAttack = {
    type: string,
    damage: {
        torso: number[],
        head: number[],
        legs: number[],
    },
    speed: {
        draw: number,
        reload: number,
    },
    general: {
        woodDamage:number,
        stoneDamage:number,
        canFlinch:string,
        projSpeed:number,
        gravityScale:number,
        maxAmmo:number,
    },
    huntsmanModifier: number,
}

type TMeleeThrow = {
    type: string,
    damage: {
        torso: number[],
        head: number[],
        legs: number[],
    },
    general: {
        woodDamage:number,
        stoneDamage:number,
        canFlinch:string,
        projSpeed:number,
        gravityScale:number,
    },
    huntsmanModifier: number,
}

type TMeleeAttack = {
    type: string,
    damage: {
        torso: number[],
        head: number[],
        legs: number[],
    },
    speed: {
        windup: number,
        combo: number,
        release: number,
        recovery: number
    },
    general: {
        length: number,
        turnCapX: number,
        turnCapY: number,
        missCost: number,
        feintCost: number,
        morphCost: number,
        staminaDrain: number,
        parryDrainNeg: number,
        stopOnHit: string,
        canCombo: string,
        knockback: number,
        woodDamage: number,
        stoneDamage: number,
        blockHeld: string,
        bMoveRest: number,
        canFlinch: string,
        feintLockOut: number,
        chamberCost: number,
        chamberFeintCost: number,
        moveRest: number
    },
}

type TWeapon = {
    type: string,
    pointCost: number,
    attacks: Array<TMeleeAttack | TMeleeThrow | TRangedAttack | TShield>,
    peasantOnly: boolean,
    isMisc: boolean,
    speedBonus?: number,
}

type IWeaponInArr = {
    name: string,
} & TWeapon

type IMeleeWeaponInArr = {
    name: string,
    attacks: Array<TMeleeAttack>,
} & TWeapon


type TWeaponPummel = {
    name: string,
    attacks: TAttackToPummel[],
}

type TAttackToPummel = {
    damage: number,
    vsArmor: string,
    hitBox: string, // todo hitBox type union
    tablePositionXY: number[], // todo try [number, number]
    type: string,
};

const wDamageFilter = (dmgArr: number[], sndWDamages: number[], mainWDamages: number[]): number[] | null => {
    const validDamages =  dmgArr.map((d1: number) => {
        const twoHitsCondition = mainWDamages.some(
            (d2: number) => (1 + d1 + d2 === 100)
        );

        // todo
        const threeHitsCondition = false;

        return twoHitsCondition || threeHitsCondition ? d1 : 0;
    });

    return validDamages.filter(d => d !== 0).length ? validDamages : null;
};


const hitBoxDmgXMapper = (hitBox: string, posX: number): {
    posX: number;
    posY: number;
    vsArmor: string;
} => {
    const posYes: { [key: string]: number } = {
        head: 0,
        torso: 1,
        legs: 2,
    };

    const armorByPosX: { [key: number]: string } = {
        0: 'naked',
        1: 'light',
        2: 'medium',
        3: 'heavy',
    };

    return {
        posX,
        posY: posYes[hitBox],
        vsArmor: armorByPosX[posX],
    };
};

const filteredAttacksMapper = (attacks: Array<{
    type: string,
    pummelDamages: { [key: string]: number[] | null },
}>): TAttackToPummel[] => {

    const allWeaponAttacks = attacks
        .reduce((memo, a) => {

            Object.entries(a.pummelDamages).forEach(([hitBox, damages]) => {

                damages?.forEach((damage, index) => {

                    const {posX, posY, vsArmor} = hitBoxDmgXMapper(hitBox, index);

                    if (damage > 0) {
                        memo.push({
                            type: a.type,
                            damage,
                            vsArmor,
                            hitBox,
                            tablePositionXY: [posX, posY],
                        });
                    }
                })
            });

            return memo
        }, [] as TAttackToPummel[]);

    return allWeaponAttacks
};

function getNumbersTo1Dmg(): number[] {

    // const allWeapons: Record<string, TWeapon> = data;

    // const kiteShield: TWeapon = data['Kite Shield'];
    // const w1411: TWeapon = data['1411'];
    // const zwei: TWeapon = data['Zweihander'];
    // const armingSword: TWeapon = data['Arming Sword'];

    const lsDmgRests: number[] = LS_DMG.map((dmg)=> 100 - 1 -dmg);


    const allWeaponsArray: IWeaponInArr[] = Object.entries(data).map(
        ([name, weapon]) => ({ name, ...weapon })
    );

    const onlyDuelWeapons: IMeleeWeaponInArr[] = allWeaponsArray.filter(
        (w)=>{
            return !w.peasantOnly && !w.isMisc && (w.type === 'melee')
        }
    ) as IMeleeWeaponInArr[];

    const weaponsPummelDamages = onlyDuelWeapons.map(w => {

        const filteredAttacks = w.attacks.map((a: TMeleeAttack) => {
            // console.log(a);
            // DESC: filtered_damages
            const ft: { [key: string]: number[] | null } = {};
            ft['head'] = wDamageFilter(a.damage.head, [1,2], LS_DMG);
            ft['torso'] = wDamageFilter(a.damage.torso, [1,2], LS_DMG);
            ft['legs'] = wDamageFilter(a.damage.legs, [1,2], LS_DMG);
            // ft[`torso_${a.type}`] = wDamageFilter(a.damage.torso, [1,2], LS_DMG);
            // ft[`head_${a.type}`] = wDamageFilter(a.damage.head, [1,2], LS_DMG);
            // ft[`legs_${a.type}`] = wDamageFilter(a.damage.legs, [1,2], LS_DMG);

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

    // const weaponsPummelDamages = onlyDuelWeapons.map(w => {
    //
    //     const filteredAttacks = w.attacks.map((a: TMeleeAttack) => {
    //         // console.log(a);
    //         // DESC: filtered_damages
    //         const ft: { [key: string]: number[] | null } = {};
    //         ft[`torso_${a.type}`] = wDamageFilter(a.damage.torso, [1,2], LS_DMG);
    //         ft[`head_${a.type}`] = wDamageFilter(a.damage.head, [1,2], LS_DMG);
    //         ft[`legs_${a.type}`] = wDamageFilter(a.damage.legs, [1,2], LS_DMG);
    //
    //
    //         // const weaponPummelDamages =
    //
    //         const pummelAttacks = Object.fromEntries(Object.entries(ft).filter(([_, arr]) => arr?.length));
    //
    //         return Object.keys(pummelAttacks).length ? pummelAttacks : null;
    //     }).filter(a => !!a);
    //
    //     return {
    //         name: w.name,
    //         attacks: filteredAttacks,
    //     }
    // }).filter(w => w.attacks.length);


    console.log(111, weaponsPummelDamages);


    // const weaponsToPummel = onlyDuelWeapons.reduce((memo, w)=>{
    //
    //
    //
    //
    //     memo[w.name]: damages
    //     return memo;
    // }, {});

    console.log('onlyDuelWeapons', onlyDuelWeapons);

    // const onlyNormalWeapons: Record<string, TWeapon> =
    //     Object.fromEntries(Object.entries(data)
    //             .filter((entry) => {
    //                 const [name, w] = entry;
    //                 return !w.peasantOnly && !w.isMisc && !(w.type === 'ranged')
    //             }));

    // console.log(onlyNormalWeapons);



    return LS_DMG.map((dmg)=> 100 - 1 -dmg);

}


 export default getNumbersTo1Dmg



