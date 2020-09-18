import { SymbaroumActor } from "./actor.js";
import { SymbaroumItem } from "./item.js";
import { PlayerSheet } from "../sheet/player.js";
import { MonsterSheet } from "../sheet/monster.js";
import { TraitSheet } from "../sheet/trait.js";
import { AbilitySheet } from "../sheet/ability.js";
import { MysticalPowerSheet } from "../sheet/mystical-power.js";
import { RitualSheet } from "../sheet/ritual.js";
import { WeaponSheet } from "../sheet/weapon.js";
import { ArmorSheet } from "../sheet/armor.js";
import { EquipmentSheet } from "../sheet/equipment.js";
import { ArtifactSheet } from "../sheet/artifact.js";
import { initializeHandlebars } from "./handlebars.js";

Hooks.once("init", () => {
    CONFIG.Combat.initiative = { formula: "@attributes.quick.value + @attributes.vigilant.value / 100", decimals: 2 };
    CONFIG.Actor.entityClass = SymbaroumActor;
    CONFIG.Item.entityClass = SymbaroumItem;
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("symbaroum", PlayerSheet, { types: ["player"], makeDefault: true });
    Actors.registerSheet("symbaroum", MonsterSheet, { types: ["monster"], makeDefault: true });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("symbaroum", TraitSheet, { types: ["trait"], makeDefault: true });
    Items.registerSheet("symbaroum", AbilitySheet, { types: ["ability"], makeDefault: true });
    Items.registerSheet("symbaroum", MysticalPowerSheet, { types: ["mysticalPower"], makeDefault: true });
    Items.registerSheet("symbaroum", RitualSheet, { types: ["ritual"], makeDefault: true });
    Items.registerSheet("symbaroum", WeaponSheet, { types: ["weapon"], makeDefault: true });
    Items.registerSheet("symbaroum", ArmorSheet, { types: ["armor"], makeDefault: true });
    Items.registerSheet("symbaroum", EquipmentSheet, { types: ["equipment"], makeDefault: true });
    Items.registerSheet("symbaroum", ArtifactSheet, { types: ["artifact"], makeDefault: true });
    initializeHandlebars();
});

Hooks.on("preCreateActor", (createData) => {
    mergeObject(createData, {
        "token.bar1" :{ "attribute" : "health.toughness" },
        "token.bar2" :{ "attribute" : "combat.defense" },
        "token.displayName" : CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
        "token.displayBars" : CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
        "token.disposition" : CONST.TOKEN_DISPOSITIONS.NEUTRAL,
        "token.name" : createData.name
    });
    if (!createData.img) {
        createData.img = "systems/symbaroum/asset/image/unknown-actor.png"
    }
    if (createData.type === "player") {
        createData.token.vision = true;
        createData.token.actorLink = true;
    }
});

Hooks.on("createOwnedItem", (actor, item) => {

});