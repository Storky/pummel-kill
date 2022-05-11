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

export type TMeleeAttack = {
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

export type TMordstatsData = {[key: string]: TWeapon};

export type TWeaponItem = {
    name: string,
} & TWeapon

export type TMeleeWeaponItem = {
    name: string,
    attacks: Array<TMeleeAttack>,
} & TWeapon
