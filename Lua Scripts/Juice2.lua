-- Сок

local com = findClass("Base.Com")
local Strategist = findClass("Moduls.Strategist")
local controller = findClass("Base.GameMapObjectsController")
local menu = findClass("MenuPck.ListTypes.OtherMenuList")

-- Установите количество необходимых итераций
local numberOfIterations = 10  -- например, 10 итераций

for iteration = 1, numberOfIterations do

    local map = getField(com, "currentGameMap")

    if map ~= nil then
        local nameId = getField(map, "nameId")
        if nameId == "Wild_E5" then
            invoke(controller, "analisMapObject", 1, true)
        end
    end

    local ensMap = getField(com, "EnsMap")
    local enemies = ensMap and getField(ensMap, "Enemys")

    if enemies ~= nil then
        for i = 0, 7 do
            local enemy = enemies[i]
            if enemy ~= nil then
                local level = getField(enemy, "level")
                if level and level > 0 then
                    setField(enemy, "cx", 0)
                    setField(enemy, "cy", 0)
                end
            end
        end
    end

    if map ~= nil then
        local nameId = getField(map, "nameId")
        if nameId == "Craft_E5_Juice" then
            invoke(controller,"analisMapObject",1,true)
            invoke(controller,"analisMapObject",2,true)
            invoke(controller,"analisMapObject",3,true)
            invoke(controller,"analisMapObject",4,true)
            invoke(controller,"analisMapObject",5,true)
            invoke(controller,"analisMapObject",8,true)
            sleep(25)
            invoke(menu,"executeDelegated",3)
            invoke(controller,"analisMapObject",6,true)
            invoke(controller,"analisMapObject",7,true)
            invoke(controller,"analisMapObject",0,true)
        end
    end

    sleep(750) 
end