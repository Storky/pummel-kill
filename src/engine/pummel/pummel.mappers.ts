
export const hitBoxDmgXMapper = (hitBox: string, posX: number): {
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

type TAttackToPummel = {
    damage: number,
    vsArmor: string,
    hitBox: string, // todo hitBox type union
    tablePositionXY: number[], // todo try [number, number]
    type: string,
};

export const filteredAttacksMapper = (attacks: Array<{
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

export const wDamageFilter = (dmgArr: number[], sndWDamages: number[], mainWDamages: number[]): number[] | null => {
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
