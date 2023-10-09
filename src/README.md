# 85.5_TodoList案例_追加動畫
    作用：將81-85學的動畫功能放到TodoList實現

##    1.重點
        (1).哪要動畫，動畫就寫在哪
        (2).執行動畫時，是依據哪種交互數據？
                =>EX.要li能有動畫效果
                =>那涉及刪除、新增li時，動畫要能有進場/離開

##    2.構思&實現
        (1).哪塊區域 or VC子組件需要動畫功能？
                【解1】WaitItem.vue中的li

                【解2】WaitList.vue中嵌套的WaitItem

        (2).是多個動畫 or 單一動畫？
                【解1】單一
                        =>因為WaitItem內，解析結果是一個個li項目
                
                【解2】多個
                        =>因為WaitList中，嵌套的WaitItem
                        =>寫到 v-for="listObj in todolist" 
                        =>表示todolist 有多少數據，就生成多少個WaitItem
        (3).觸發時機？
                【解1】執行 添加跟刪除時執行進入/離開的動畫 => 即某一id項目數據的變化
                        =>因編輯只是數據的更新，未做增/刪，故編輯時不會有動畫。
                        =>將整段<li></li>放入<transition>內
                        
                【解2】執行 添加跟刪除時執行進入/離開的動畫 
                        => 即某一id項目數據的變化
                        => 因todolist 有多少數據，就生成多少個WaitItem
                        => 且每個生成的WaitItem，有自己獨立的id
                        => 等同【解1】
