![image-20230730164654567](https://s2.loli.net/2023/07/30/E3kQgAYecmSj7Jo.png)

# Kotlin程式設計中級篇

我們在前面已經學習了Kotlin程式設計的基礎篇，本章我們將繼續介紹更多Kotlin特性，以及物件導向編程。

## 函式

其實函式我們在一開始就在使用了：

```kotlin
fun main() {
		println("Hello World")
}
```

我們程式的入口點就是`main`函式，我們只需要將我們的程式碼編寫到主函式中就可以執行了，不過這個函式只是由我們來定義，而不是我們自己來呼叫。當然，除了主函式之外，我們一直在使用的`println`也是一個函式，不過這個函式是標準庫中已經實現好了的，現在是我們在呼叫這個函式：

```kotlin
println("Hello World!");    //直接透過 函式名稱(參數...) 的形式呼叫函式
```

那麼，函式的具體定義是什麼呢？

> 函式是完成特定任務的獨立程式碼單元。

其實簡單來說，函式是為了完成某件任務而生的，可能我們要完成某個任務並不是一行程式碼就可以搞定的，但是現在可能會遇到這種情況：

```kotlin
fun main() {
    var a = 10

    println("H") //比如下面這三行程式碼就是我們要做的任務
    println("A")
    a += 10

    if (a > 20) {
        println("H") //這裡我們還需要執行這個任務
        println("A")
        a += 10
    }

    when (a) {
        30 -> {
            println("H") //這裡又要執行這個任務
            println("A")
            a += 10
        }
    }
}
```

我們每次要做這個任務時，都要完完整整地將任務的每一行程式碼都寫下來，如果我們的程式中多處都需要執行這個任務，每個地方都完整地寫一遍，實在是太臃腫了，有沒有一種更好的辦法能最佳化我們的程式碼呢？

這時我們就可以考慮使用函式了，我們可以將我們的程式邏輯程式碼全部編寫到函式中，當我們執行函式時，實際上執行的就是函式中的全部內容，也就是按照我們制定的規則執行對應的任務，每次需要做這個任務時，只需要呼叫函式即可。

我們來看看，如何建立和使用函式。

### 建立和使用函式

Kotlin函式使用`fun`關鍵字宣告：

```kotlin
fun 函式名稱([函式參數...]): 返回值類型 {
    //函式體
}
```

其中函式名稱也是有要求的，並不是所有的字元都可以用作函式名稱，它的命名規則與變數的命名規則基本一致，所以這裡就不一一列出了。函式不僅僅需要完成我們的任務，可能某些函式還需要告訴我們結果，我們同樣可以將函式返回的結果賦值給變數或是參與運算等等，當然如果我們的函式只需要完成任務，不需要告訴我們結果，返回值類型可以不填，我們先從最簡單的開始：

```kotlin
//這個函式用於列印一段文字
fun hello(): Unit {  //本質上應該是返回Unit類型，這個類型表示空，類似於Java中的void，預設情況下可以省略
    println("PHP是世界上最好的語言.kt")
}
```

我們要呼叫這個函式也很簡單，只需要像下面這樣就可以了：

```kotlin
fun main() {
    hello()     //呼叫函式只需使用 函式名() 即可
}
```

不過，有些時候，我們可能需要外部傳入一些參數來使用，比如：

```kotlin
fun say(message: String){   //在定義函式時，可以將參數寫到
    println("我說：$message")
}
```

這裡我們在函式的小括號中填入的就是形式參數，這代表呼叫函式時需要傳入的資料，比如這裡就是我們要列印的字串，而實際在呼叫函式時，填入的內容就是實際參數：

```kotlin
fun main() {
  	//在呼叫帶參數的函式時，必須填寫實參，否則無法編譯透過
  	//這裡填入的內容就是實際參數
    say("你幹嘛")
  	//也可以將變數作為實際參數傳入
  	val str: String = "哎喲"
    say(str)
}
```

還有一些時候，我們的函式可能需要返回一個計算的結果給呼叫者，我們也可以設定函式的返回值：

```kotlin
//這個函式用於計算兩個Int數之和
fun sum(a: Int, b: Int) : Int {
    return a + b  //使用return語句將結果返回
}
```

帶返回值的函式，呼叫之後得到的返回值，可以由變數接收，或是直接作為其他函式的參數：

```kotlin
fun main() {
    var result = sum(1, 2)   //獲取函式返回值
    println(result)
    println(sum(2, 4))  //直接列印函式返回值
}
```

注意這個`return`關鍵字在執行之後，是不會繼續執行之後的內容的：

```kotlin
fun main() {
    println(test(-2))
    println(test(10))
}

fun test(i: Int): String{
    if(i > 0) return "Hello"
  	println("繼續")
    return "World"   //如果滿足上面條件，在執行return之後，後續無論有沒有執行完，都不會再往下了
}
```

有些時候，我們也可以設計一些參數帶有預設值的函式，如果在呼叫函式時不填入參數，那麼就使用我們一開始設定好的預設值作為實際傳入的參數：

```kotlin
fun main() {
    test()   //呼叫函式時，如果對應參數有預設值，可以不填
}

fun test(text: String = "我是預設值"){
    println(text)
}
```

在呼叫函式時，我們可以手動指定傳入的參數對應的是哪一個形式參數：

```kotlin
fun main() {
    test(b = 3)  //這裡如果只想填寫第二個參數b，我們可以直接指定吧實參給到哪一個形參
  	test(3)   //這種情況就是只填入第一個實參
}

fun test(a: Int = 6, b: Int = 10): Int {
    return a + b
}
```

對於一些內容比較簡單的函式，比如上面僅僅是計算兩個參數的和，我們可以直接省略掉花括號，像這樣編寫：

```kotlin
fun test(a: Int = 6, b: Int = 10): Int = a + b   //函式的結果直接縮減為 = a + b 效果跟之前是一樣的
fun test(a: Int = 6, b: Int = 10) = a + b  //返回類型可以自動推斷，這裡可以吧返回類型省掉
```

這裡還需要注意一下，函式的形式參數預設情況下為常量，無法進行修改，只能使用：

![image-20230730215022812](https://s2.loli.net/2023/07/30/FELmoM7YeyuI5PC.png)

比較奇葩的是，函式內部也可以定義函式：

```kotlin
fun outer(){
    fun inner(){
        //函式內部定義的函式，無限套娃
    }
}
```

函式內的函式作用域是受限的，我們只能在函式內部使用：

```kotlin
fun outer(){
    fun inner(){
    }

    inner()
}
```

內部函式可以訪問外部函式中的變數：

```kotlin
fun outer(){
    val a = 10;
    fun inner(){
        println(a)
    }
}
```

最後，我們不能同時編寫多個同名函式，這會導致衝突：

![image-20231224002414385](https://s2.loli.net/2023/12/24/MWoR74TGleN58hx.png)

但是，如果多個同名函式的參數不一致，是允許的：

```kotlin
fun test() = println("A")
fun test(str: String) = println("B")  //參數列表不一致
```

我們在呼叫這個函式時，編譯器會根據我們傳入的實參自動匹配使用的函式是哪一個：

```kotlin
...

fun main() {
    test("")  //結果為B
}
```

以上適用於形參列表不同的情況，如果僅僅是返回值類型不同的情況，同樣是不允許的：

![image-20231224002803600](https://s2.loli.net/2023/12/24/x42zKmkeBfdJAhQ.png)

像這種編寫同名但不同參數的函式，我們稱為*函式的重載*。

### 再談變數

前面我們學習了如何使用變數，只不過當時我們僅僅是在main函式中使用的局部變數，我們也可以將變數的作用域進行提升，將其直接變成一個頂級定義：

```kotlin
var str: String = "尊嘟假嘟"   //跟定義函式一樣，直接寫在Kt文件中

fun main() {
    ...
}
```

此時，這個變數可以被所有的函式使用：

```kotlin
var str: String = "尊嘟假嘟"

fun main() = println(str)  //作用域的提升，使得變數可以被隨意使用
fun test() = println(str)
```

以上也只是對變數的一些簡單使用，現在變數的作用域被提升到頂層，它可以具有更多的一些特性，那麼，我們就再來重新認識一下變數，宣告一個變數的完整語法如下：

```kotlin
var <propertyName>[: <PropertyType>] [= <property_initializer>]
    [<getter>]
    [<setter>]
```

前面的我們知道，但是這個getter和setter是個什麼鬼？對於這種頂層定義的變數（包括後面類中會用到的成員屬性變數）可以具這兩個可選的函式，它們本質上是一個get和set函式：

* getter：用於獲取這個變數的值，預設情況下直接返回目前這個變數的值
* setter：用於修改這個變數的值，預設情況下直接對這個變數的值進行修改

我們在使用這種全域變數時，對於變數的獲取和設定，本質上都是透過其getter和setter函式來完成的，只不過預設情況下不需要我們去編寫，程式編譯之後，有點像這樣的結果：

```kotlin
var name: String = "小明"

fun getName() : String {   //編譯時自動生成了對應變數的get函式
    return this.name
}
  
fun setName(name: String) {  //編譯時自動生成了set函式
   this.name = name;
}
```

而對於其使用，在編譯之後，會變成這樣：

```kotlin
fun main() {
    println(getName())   //獲取name時本質上是呼叫getName函式
}
```

是不是感覺好神奇，一個變數都能搞這麼多花樣，這其實是為了後續多態的一些性質而設計的（下一章講解）

可以看到，在預設情況下，變數的獲取就是直接返回，設定就是直接修改，不過有些時候我們可能希望修改這些變數獲取或修改時執行的操作，我們可以手動編寫：

```kotlin
var str: String = "尊嘟假嘟"
    get() = field + field   //使用filed代表目前這個變數(欄位)的值，這裡返回值拼接的結果
```

> 這裡使用的field準確的說應該是Kotlin提供的"後備欄位"，因為我們使用getter和setter本質上替代了原有的獲取和修改方式，使其變得更像是函式的呼叫，因此，為了能夠繼續像之前使用一個變數那樣去操作它本身，就有了這個後備欄位。

最後得到的就是：

![image-20230823214656414](https://s2.loli.net/2023/08/23/5htXuoyN4SVYrIE.png)

甚至還可以寫成這樣，在獲取的時候執行一些操作：

```kotlin
var str: String = "尊嘟假嘟"
    get() {
        println("獲取變數的值：")   //獲取的時候列印一段文字
        return field + "666"
    }

fun main() = println(str)
```

同樣的，設置的時候也可以自訂：

```kotlin
var str: String = "尊嘟假嘟"
    get() = field + field
    set(value) {    //這裡的value就是給過來的值
        println("設定變數的值")
        field = value   //注意，對於val類型的變數，沒有set函式，因為不可變
    }
```

因此，一個變數有些時候可能會寫成這樣：

```kotlin
val str get() = "你幹嘛"
```

當然，預設情況下其實沒有必要去重寫get和set除非特殊需求。

### 遞迴函式

我們前面學習了如何呼叫函式，實際上函式自己也可以呼叫自己。

```kotlin
fun test(){
    test()   //我自己呼叫自己
}
```

肯定會有小伙伴疑問，函式自己呼叫自己有什麼意義？反而還會導致函式無限的呼叫下去，無窮無盡，確實，如果不加限制地讓函式自己呼叫自己：

![image-20230821034317397](https://s2.loli.net/2023/08/21/JhKSzY9TvfXBqGr.png)

就會出現這種`爆堆疊`的情況，這是因為程式的記憶體是有限的，不可能無限制的繼續呼叫下去，因此，在自我呼叫到一定的深度時，會被強制終止。所以說這東西有什麼用呢？如果我們對遞迴函式加以一些限制，或許會有意想不到的發現：

```kotlin
fun main() {
    test(5)  //計算0-5的和
}

//這個函式實現了計算0-n的和的功能
fun test(n: Int): Int{
    if(n <= 0) return 0  //當n等於0的時候就不再向下，而是直接返回0
    return n + test(n - 1)  //n不為0就返回目前的n加上test參數n-1的和
}
```

這個函式最終呼叫起來就像這樣：

> test(5) = 5 + test(4) = 5 + 4 + test(3) =  ...  = 5 + 4 + 3 + 2 + 1 + 0

可以看到，只要合理使用遞迴函式，加以一定的結束條件，反而能夠讓我們以非常簡潔的形式實現一個需要循環來完成的操作。

我們可以再來看一個案例：

> 斐波那契數列是一個非常經典的數列，它的定義是：前兩個數是1和1，之後的每個數都是前兩個數的和。
>
> 斐波那契數列的前幾個數字依次是：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...

對於求解斐波那契數列第N個數這類問題，我們也可以使用遞迴來實現：

```kotlin
fun main() {
    println(fib(5))
}

fun fib(n: Int): Int{
    if(n <= 2) return 1   //我們知道前兩個一定是1，所以直接返回
    return fib(n - 1) + fib(n - 2)   //目前fib(n)的結果就是前兩個結果之和，直接遞迴繼續找
}
```

是不是感覺遞迴函式非常神奇？它甚至可以解決一些動態規劃問題、一些分治演算法等。

不過，這種函式的效率就非常低了，相比循環來說，使用遞迴解決斐波那契問題，時間複雜度會呈指數倍增長，且n大於20時基本上可以說很卡了（可以想像一下，每一個fib(n)都會分兩個出去，實際上這個中間存在大量重複的計算）

那麼，有沒有辦法可以將這種尾部作為返回值進行遞迴的操作最佳化一下呢？我們可以使用`tailrec`關鍵字來實現：

```kotlin
tailrec fun test(n: Int, sum: Int = 0): Int {
    if(n <= 0) return sum   //到底時返回累加的結果
    return test(n - 1, sum + n)  //不斷累加
}
```

實際上在編譯之後，會變成這樣：

![image-20230821040623152](https://s2.loli.net/2023/08/21/5vpxkKcOHPBT6dI.png)

可以看到它變成了一個普通的循環操作，這也是編譯器的功勞，同樣的，對於斐波那契數列：

```kotlin
tailrec fun fib(n: Int, prev: Int = 0, next: Int = 1): Int {
    return if (n == 0) prev else fib(n - 1, next, prev + next)  //從0和1開始不斷向後，直到n為0就返回
}
```

### 實用庫函式介紹

Kotlin為我們內建了大量實用的庫函式，我們可以使用這些庫函式來快速完成某些操作。

比如我們前面使用的`println`就是Kotlin提供的庫函式，我們可以使用這個函式快速進行資料列印：

```kotlin
fun main() {
    println("Hello World")  //這裡其實就是在呼叫函式，傳入了一個String類型的參數
}
```

那既然現在有輸出，能不能讓使用者輸入，然後我們來讀取呢？

```kotlin
fun main() {
    val text = readln()
    println("讀取到使用者輸入：$text")
}
```

我們可以在控制台輸入一段文字，然後Enter結束：

![image-20230731011757655](https://s2.loli.net/2023/07/31/7IOsxj4eqMPo8kc.png)

Kotlin提供的運算符實際上只能進行一些在小學數學中出現的運算，但是如果我們想要進行乘方、三角函數之類的進階運算，就沒有對應的運算符能夠做到，而此時我們就可以使用數學工具類來完成。

```kotlin
import kotlin.math.*    //我們需要使用import來引入某些庫，這樣才能使用庫函式

fun main() {
    1.0.pow(4.0)  //我們可以使用pow方法直接計算a的b次方
    abs(-1);    //abs方法可以求絕對值
    max(19, 20);    //快速取兩個數的最大值
    min(2, 4);   //快速取最小值
    sqrt(9.0);    //求一個數的算術平方根
}
```

當然，三角函數肯定也是安排上了的：

```kotlin
fun main() {
    //這裡我們可以直接使用庫中預設好的PI
    sin(PI / 2);     //求π/2的正弦值，這裡我們可以使用預置的PI進行計算
    cos(PI);       //求π的餘弦值
    tan(PI / 4);    //求π/4的正切值

    asin(1.0);     //三角函數的反函式也是有的，這裡是求arcsin1的值
    acos(1.0);
    atan(0.0);
}
```

可能在某些情況下，計算出來的浮點數會得到一個很奇怪的結果：

```kotlin
fun main() {
    println(sin(Math.PI));
}
```

![image-20230731010301773](https://s2.loli.net/2023/07/31/Nyn762CYBstz1TF.png)

正常來說，sinπ的結果應該是0才對，為什麼這裡得到的是一個很奇怪的數？這個E是幹嘛的，這其實是科學計數法的10，後面的數就是指數，上面的結果其實就是：

- 1.2246467991473532×10−161.2246467991473532×10−16

其實這個數是非常接近於0，這是因為精度問題導致的，所以說實際上結果就是0。

我們也可以計算對數函式：

```kotlin
fun main() {
    ln(E)    //e為底的對數函式，其實就是ln，我們可以直接使用Math中定義好的e
    log10(100.0)    //10為底的對數函式
  	log2(8.0)    //2為底的對數函式
    //利用換底公式，我們可以弄出來任何我們想求的對數函式
    val a = ln(4.0) / ln(2.0) //這裡是求以2為底4的對數，log(2)4 = ln4 / ln2
    println(a)
}
```

還有一些比較特殊的計算：

```kotlin
fun main() {
    ceil(4.5) //透過使用ceil來向上取整
    floor(5.6) //透過使用floor來向下取整
}
```

向上取整就是找一個大於目前數字的最小整數，向下取整就是砍掉小數部分。注意，如果是負數的話，向上取整就是去掉小數部分，向下取整就是找一個小於目前數字的最大整數。

### 高階函式與lambda表達式

**注意：**  這一部分比較難理解，如果看不懂可以後面回來看。

Kotlin中的函式屬於一等公民，它支援很多進階特性，甚至可以被儲存在變數中，可以作為參數傳遞給其他高階函式並從中返回，就想使用普通變數一樣。 為了實現這一特性，Kotlin作為一種靜態類型的程式語言，使用了一系列函式類型來表示函式，並提供了一套特殊的語言結構，例如lambda表達式。

那麼這裡說的高階函式是什麼，lambda表達式又是什麼呢？

> 正是得益於函式可以作為變數的值進行儲存，因此，如果一個函式接收另一個函式作為參數，或者返回值的類型就是一個函式，那麼該函式稱為高階函式。

要宣告函式類型，需要按照以下規則：

- 所有函式類型都有一個括號，並在括號中填寫參數類型列表和一個返回類型，比如：`(A, B) -> C ` 表示一個函式類型，該類型表示接受類型`A`和`B`的兩個參數並返回類型`C`的值的函式。參數類型列表可為空的，比如`() -> A`，注意，即使是`Unit`返回類型也不能省略。

我們可以像下面這樣編寫：

```kotlin
//典型的函式類型 (參數...) -> 類型  小括號中間是一個剪頭一樣的符號，然後最後是返回類型
var func0: (Int) -> Unit  //這裡的 (Int) -> Unit 表示這個變數儲存的是一個有一個int參數並且沒有返回值的函式
var func1: (Double, Double) -> String   //同理，代表兩個Double參數返回String類型的函式
```

同樣的，作為函式的參數也可以像這樣表示：

```kotlin
fun test(other: (Int) -> String){
}
```

函式類型的變數，我們可以將其當做一個普通的函式進行呼叫：

```kotlin
fun test(other: (Int) -> String){
    println(other(1))  //這裡提供的函式接受一個Int參數返回string，那麼我們可以像普通函式一樣傳入參數呼叫它
}
```

由於函式可以接受函式作為參數，所以說你看到這樣的套娃場景也不奇怪：

```kotlin
var func: (Int) -> ((String) -> Double)
```

不過這樣寫可能有些時候不太優雅，我們可以為類型起別名來縮短名稱：

```kotlin
typealias HelloWorld = (String) -> Double

fun main() {
    var func: HelloWorld
}
```

那麼，函式類型我們知道如何表示了，如何具體表示一個函式呢？我們前面都是透過`fun`來宣告函式：

```kotlin
fun test(str: String): Int {
    return 666
}
```

而現在我們的變數也可以直接表示這個函式：

```kotlin
fun main() {
  	//這個變數表示的也是(String) -> Int這種類型的函式
    var func: (String) -> Int = ::test   //使用雙冒號來引用一個現成的函式（包括我們後續會學習的成員函式、建構子等）
}

//這個函式正好與上面的變數表示的函式類型一致
fun test(str: String): Int {
    return 666
}
```

除了引用現成的函式之外，我們也可以使用匿名函式，這是一種沒有名稱的函式：

```kotlin
fun main() {
    val func: (String) -> Int = fun(str: String): Int {  //這裡寫了fun關鍵字後，並沒有編寫函式名稱，這種函式就是匿名函式，因為在這裡也不需要什麼名字，只需要參數列表函式體
        println("這是傳入的內容$str")
        return 666
    }
}
```

匿名函式除了沒名字之外，其他的用法跟函式是一樣的。

最後，我們來看看今天的重量級嘉賓，不要小看了Kotlin的語法，我們也可以使用Lambda表達式來表示一個函式實例：

```kotlin
fun main() {
    var func: (String) -> Int = {  //一個Lambda表達式只需要直接在花括號中編寫函式體即可
        println("這是傳入的參數$it")   //預設情況下，如果函式只有一個參數，我們可以使用it代表傳入的參數
        666   //跟之前的if表達式一樣，預設最後一行為返回值
    }
  	func("HelloWorld!")
}
```

是不是感覺特別簡便？

![image-20230730230512284](https://s2.loli.net/2023/07/30/fsxB2UhpXZewk4Q.png)

對於參數有多個的情況，我們也可以這樣進行編寫：

```kotlin
fun main() {
    val func: (String, String) -> Unit = { a, b ->   //我們需要手動添加兩個參數這裡的形參名稱，不然沒辦法用他兩
        println("這是傳入的參數$a, 第二個參數$b")   //直接使用上面的形參即可
    }
  	val func2: (String, String) -> Unit = { _, b ->
        println("這是傳入的第二個參數$b")   //假如這裡不使用第一個參數，也可以使用_下劃線來表示不使用
    }
    func("Hello", "World")
}
```

![image-20230730230633880](https://s2.loli.net/2023/07/30/R9WjhIUinaP465p.png)

是不是感覺玩的非常進階？還有更進階的在後面呢！

我們接著來看，如果我們現在想要呼叫一個高階函式，最直接的方式就是下面這樣：

```kotlin
fun main() {
    val func: (Int) -> String = { "收到的參數為$it" }
    test(func)
}

fun test(func: (Int) -> String) {
    println(func(66))
}
```

當然我們也可以直接把一個Lambda作為參數傳入作為實際參數使用：

```kotlin
fun main() {
    test({ "收到的參數為$it" })
}
```

不過這樣還不夠簡潔，在Kotlin中，如果函式的最後一個形式參數是一個函式類型，可以直接寫在括號後面，就像下面這樣：

```kotlin
test() { "收到的參數為$it" }
```

由於小括號裡面此時沒有其他參數了，還能繼續省，直接把小括號也給幹掉：

```kotlin
test { "收到的參數為$it" }   //乾脆連小括號都省了，這語法真的絕
```

當然，如果在這之前有其他的參數，只能寫成這樣了：

```kotlin
fun main() {
    test(1) { "收到的參數為$it" }
}

//這裡兩個參數，前面還有一個int類型參數，但是同樣的最後一個參數是函式類型
fun test(i: Int, func: (Int) -> String) {
    println(func(66))
}
```

這種語法也被稱為 尾隨lambda表達式，能省的東西都省了，不過只有在最後一個參數是函式類型的情況下才可以，如果不是最後一位，就沒辦法做到尾隨了。

最後需要特別注意的是，在Lambda中沒有辦法直接使用`return`語句返回結果，而是需要用到之前我們學習流程控制時用到的標籤：

```kotlin
fun main() {
    val func: (Int) -> String = test@{
        //比如這裡判斷到it大於10就提前返回結果
        if(it > 10) return@test "我是提前返回的結果"
        println("我是正常情況")
        "收到的參數為$it"
    }
    test(func)
}

fun test(func: (Int) -> String) {
    println(func(66))
}
```

如果是函式呼叫的尾隨lambda表達式，預設的標籤名字就是函式的名字：

```kotlin
fun main() {
    testName {  //預設使用函式名稱
        if(it > 10) return@testName "我是提前返回的結果"
        println("我是正常情況")
        "收到的參數為$it"
    }
}

fun testName(func: (Int) -> String) {
    println(func(66))
}
```

不過，為什麼要這麼麻煩呢，還要打標籤才能返回，這不多此一舉嗎？這個問題我們會在下一節行內函式中進行講解。

### 行內函式

使用高階函式會可能會影響執行時的效能：每個函式都是一個物件，而且函式內可以訪問一些局部變數，但是這可能會在記憶體分配（用於函式物件和類）和虛擬呼叫時造成額外開銷。

為了最佳化性能，開銷可以透過行內Lambda表達式來消除。使用`inline`關鍵字會影響函式本身和傳遞給它的lambdas，它能夠讓方法的呼叫在編譯時，直接取代為方法的執行程式碼，什麼意思呢？比如下面這段程式碼：

```kotlin
fun main() {
    test()
}

//添加inline表示行內函式
inline fun test(){
    println("這是一個行內函式")
  	println("這是一個行內函式")
  	println("這是一個行內函式")
}
```

由於test函式是行內函式，在編譯之後，會原封不動地把程式碼搬過去：

```kotlin
fun main() {
    println("這是一個行內函式")   //這裡是test函式第一行，直接搬過來
  	println("這是一個行內函式")
  	println("這是一個行內函式")
}
```

同樣的，如果是一個高階函式，效果那就更好了：

```kotlin
fun main() {
    test { println("列印：$it") }
}

//添加inline表示行內函式
inline fun test(func: (String) -> Unit){
    println("這是一個行內函式")
    func("HelloWorld")
}
```

由於test函式是行內的高階函式，在編譯之後，不僅會原封不動地把程式碼搬過去，還會自動將傳入的函式參數貼到呼叫的位置：

```kotlin
fun main() {
    println("這是一個行內函式")   //這裡是test函式第一行
  	val it = "HelloWorld"  //這裡是函式內傳入的參數
    println("列印：$it")  //第二行是呼叫傳入的函式，自動貼過來
}
```

行內會導致編譯出來的程式碼變多，但是同樣的換來了性能上的提升，不過這種操作僅對於高階函式有顯著效果，普通函式實際上完全沒有行內的必要，也提升不了多少性能。

注意，行內函式中的函式形參，無法作為值給到變數，只能呼叫：

![image-20230731131403842](https://s2.loli.net/2023/07/31/ufLoiIyGKTbYV9H.png)

同樣的，由於行內，導致程式碼被直接搬運，所以Lambda中的return語句可以不帶標籤，這種情況會導致直接返回：

```kotlin
fun main() {
    test { return }  //行內高階函式的Lambda參數可以直接寫return不指定標籤
    println("呼叫上面方法之後")
}

inline fun test(func: (String) -> Unit){
    func("HelloWorld")
    println("呼叫行內函式之後")
}
```

上述程式碼的執行結果就是，直接結束，兩句println都不會列印，這種情況被稱為**非局部返回**。

回到上一節最後我們提出的問題，實際上，在Kotlin中Lambda表達式支援一個叫做"標籤返回"（labeled return）的特性，這使得你能夠從一個Lambda表達式中返回一個值給外圍函式，而不是簡單地返回給Lambda表達式所在的最近的封閉函式，就像下面這樣：

```kotlin
fun main() {
    test { return@main }  //標籤可以直接指定為外層函式名稱main來提前終止整個外部函式
    println("呼叫上面方法之後")
}

inline fun test(func: (String) -> Unit){
    func("HelloWorld")
    println("呼叫行內函式之後")
}
```

效果跟上面是完全一樣的，為了避免這種情況，我們也可以像之前一樣將標籤寫為@test來防止非局部返回。

```kotlin
fun main() {
    test { return@test }  //這樣就只會使test返回，而不會影響到外部函式了
    println("呼叫上面方法之後")
}
```

有些時候，可能一個行內的高階函式中存在好幾個函式參數，但是我們希望其中的某一個函式參數不使用行內，能夠跟之前一樣隨意當做變數使用：

```kotlin
fun main() {
    test({ println("我是一號：$it") }, { println("我是二號：$it") })
}

//在不需要行內的函式形參上添加noinline關鍵字，來防止此函式的呼叫行內
inline fun test(func: (String) -> Unit, noinline func2: (Int) -> Unit){
    println("這是一個行內函式")
    func("HelloWorld")
  	var a = func2  //這樣就不會報錯，但是不會行內了
    func2(666)
}
```

最後編譯出來的結果，類似於：

```kotlin
fun main() {
    println("這是一個行內函式")
    val it = "HelloWorld"
    println("列印：$it")
  	//第二個參數由於不是行內，這裡依然作為Lambda使用
    val func2: (Int) -> Unit = { println("我是二號：$it") }
    func2(666)
}
```

由於目前知識的學習還不太夠，函式我們只能先暫時告一段落，在後續的學習中我們會繼續認識更多函式的特性。

***

## 類與物件

在之前，我們一直在使用頂層定義：

```kotlin
val a = 20   //直接在kt文件中定義變數

fun message() {   //直接在kt文件中定義函式
    println("我是測試方法")
}
```

而學習了類之後，這些內容也可以定義到類中，作為類的屬性存在。

類的概念我們在生活中其實已經聽說過很多了。

人類、鳥類、魚類... 所謂類，就是對一類事物的描述，是抽象的、概念上的定義，比如鳥類，就泛指所有具有鳥類特徵的動物。比如人類，不同的人，有著不同的性格、不同的愛好、不同的樣貌等等，但是他們根本上都是人，所以說可以將他們抽象描述為人類。

物件是某一類事物實際存在的每個個體，因而也被稱為實例（instance）我們每個人都是人類的一個實際存在的個體。

![image-20220919203119479](https://s2.loli.net/2022/09/19/U2P7qWOtRz5bhFY.png)

所以說，類就是抽象概念的人，而物件，就是具體的某一個人。

- A：是誰拿走了我的手機？
- B：是個人。（某一個類型）
- A：我還知道是個人呢，具體是誰呢？
- B：是XXX。（具體某個物件）

而在Kotlin中，也可以像這樣進行編程，我們可以定義一個類，然後進一步建立許多這個類的實例物件，像這種編程方式，我們稱為**物件導向編程**，我們除了去使用Kotlin給我們提供的類型之外，我們也可以使用自己定義的類。

### 類的定義與物件建立

前面我們介紹了什麼是類，什麼是物件，首先我們就來看看如何去定義一個類。

Kotlin中的類使用關鍵字`class`宣告，我們可以直接在預設的Main.kt文件中編寫：

```kotlin
class Student {
    //在沒有任何內容時，花括號可以省略
}
```

我們在對類進行命名時，一般使用英文單字，並且首字母大寫，跟變數命名一樣，不能出現任何的特殊字元。

除了直接在某個.kt文件中直接編寫之外，為了規範，我們一般將一個類單獨建立一個文件，我們可以右鍵`src`目錄：

![image-20230730165458965](https://s2.loli.net/2023/07/30/hHwPDdyGv1jBUkZ.png)

這裡選擇建立，然後選擇Kotlin類/文件選項，然後建立一個類：

![image-20230730165447840](https://s2.loli.net/2023/07/30/JyILfdRTBVPteQw.png)

文件建立完成後，預設也會為我們生成類的定義，並且類名稱與建立的類文件是一模一樣的：

![image-20230730165605898](https://s2.loli.net/2023/07/30/IqKNH6iyzWhak9R.png)

這是一個非常簡單的類，但是肯定遠遠不夠。

既然是學生類，那麼肯定有學生相關的一些屬性，比如名字、性別、年齡等等，那麼怎麼才能給這個類添加一些屬性呢？我們需要指定類的建構子，建構子也是函式的一種，但是它是專用於物件的建立，Kotlin中的類可以添加一個*主建構子*和一個或多個*次要建構子*。主建構子是類定義的一部分，像下面這樣編寫：

```kotlin
class Student constructor(name: String, age: Int) {
    //比如學生有name和age屬性，那麼我們可以在類名後面constructor的括號中編寫，並用逗號隔開
  	//這裡跟定義變數差不多，也是變數名稱:類型，這些作為類的成員屬性，後續可以在類中使用
}
```

如果主建構子沒有任何注釋或可見性修飾符，則可以省略`constructor`關鍵字，如果類中沒有其他內容要寫，可以直接省略花括號，最後就變成這樣了：

```kotlin
class Student(name: String, age: Int)
```

但是，這裡僅僅是定義了建構子的參數，這還不是類的屬性，那麼我們要怎麼才能定義為類的屬性呢？我們可以為這些屬性添加`var`或`val`關鍵字來表示這個屬性是可變還是不變的：

```kotlin
class Student(var name: String, val age: Int)
```

這跟我們之前使用變數基本一致：

* `val`：不可變屬性
* `var`：可變屬性

這樣才算是定義了類的屬性，我們也可以給這些屬性設定初始值：

```kotlin
class Student(var name: String, val age: Int = 18)  //預設每個學生18歲
```

除了將屬性添加到建構子中，我們也可以將這些屬性直接作為類的成員變數寫到類中，但是這種情況必須要配一個預設值，否則無法透過編譯：

```kotlin
class Student {
    var name: String = ""   //必須配一個預設值
    var age: Int = 0
}
```

這樣我們就可以不編寫主建構子也能定義屬性，但是這裡仍然會隱式生成一個無參的建構子，為了建構子能夠方便地傳值初始化，也可以像這樣寫：

```kotlin
class Student(name: String, age: Int) {
    var name: String = name   //透過建構子傳遞過來
    var age: Int = age
}
```

當然，如果各位不希望這些屬性在一開始就有初始值，而是之後某一個時刻去設定初始值，我們也可以為其添加懶載入：

```kotlin
class Student {
    lateinit var name: String   //懶載入的屬性可以不用在一開始賦值，但是在下一次使用之前一定要先完成賦值，否則報錯
    var age: Int = 0
}
```

並且，像這樣編寫的類成員變數，也可以自訂對應的getter和setter屬性：

```kotlin
class Shape(var width: Int, var height: Int) {
    val area get() = width * height
}
```

那麼，現在我們定義了主建構子之後，該怎麼去使用它呢？

跟我們呼叫普通函式一樣，這裡的函式名稱就是類的名稱，如果一個類沒有編寫建構子，那麼這個類預設情況下使用一個無參建構子建立：

```kotlin
fun main() {
  	//我們可以直接使用 類名() 的形式建立物件
    Student()
}
```

如果是有建構子的類，我們只需要填寫需要的參數即可，呼叫之後，類的屬性就是這裡我們給進去的參數了：

```kotlin
fun main() {
  	//我們可以直接使用 類名(參數, 參數...) 的形式建立
    Student("小明", 18)
}
```

這樣，我們就成功建立出了一個名字為小明的學生類型物件，但是這個物件僅僅是建立出來還不行，我們肯定需要去使用它。

實際上，我們可以像之前使用基本類型一樣，使用物件，我們也可以使用一個變數去接收生成出來的物件：

```kotlin
fun main() {
  	//使用Student類型的變數接收構造方法得到的物件
    var stu: Student = Student("小明", 18)
}
```

有一個我們需要注意的點，這裡的stu存放的是物件的引用，而不是本體，我們可以透過物件的引用來間接操作物件。

```kotlin
fun main() {
    val p1 = Student("小明", 18)
    val p2 = p1
}
```

這裡，我們將變數p2賦值為p1的值，那麼實際上只是傳遞了物件的引用，而不是物件本身的複製，這跟我們前面的基本資料類型有些不同，p2和p1都指向的是同一個物件（如果你學習過C語言，它就類似於指標一樣的存在）

![image-20220919211443657](https://s2.loli.net/2022/09/19/GBPaNZsr2MSKvCq.png)

我們可以來測試一下：

```kotlin
fun main() {
    val s1 = Student("小明", 18)
    val s2 = s1
    println(s1 === s2)  //使用 === 可以判斷兩個變數引用的是不是同一個物件
}
```

但是如果我們像這樣去編寫：

```kotlin
fun main() {
    val s1 = Student("小明", 18)
    val s2 = Student("小明", 18)   //即使名字和年齡一樣，但是由於這裡重新建立了一次物件
    println(s1 === s2)  //這裡比較的就不是同一個物件了
}
```

我們可以使用`.`運算符來訪問物件的屬性，比如我們要訪問小明這個學生物件的屬性：

```kotlin
fun main() {
    val stu = Student("小明", 18)
    println("物件的name = ${stu.name}, age = ${stu.age}")
}
```

獲取和修改都是可以的：

```kotlin
fun main() {
    val stu = Student("小明", 18)
    stu.name = "大明"
    stu.age = 10   //由於age屬性是val，所以說無法修改，只能讀取
}
```

注意，不同物件的屬性是分開獨立存放的，雖然都是統一由類完成定義，但是每個物件都有一個自己的空間，修改一個物件的屬性並不會影響到另一個相同類型的物件：

```kotlin
fun main() {
    val stu1 = Student("小明", 18)
    val stu2 = Student("小明", 18)
    stu1.name = "小紅"
    println("${stu1.name}, ${stu2.name}")
}
```

除了直接使用主建構子建立物件外，我們也可以添加一些次要建構子，比如我們的學生可以只需要一個名字就能完成建立，我們可以直接在類中編寫一個次要建構子：

```kotlin
class Student(var name: String, val age: Int) {
    constructor(name: String) : this(name, 18)
}
```

如果該類有一個主建構子，則每個次要建構子需要透過另一個次要建構子直接或間接委託給主建構子。委託到同一類的另一個建構子是`this`關鍵字完成的：

```kotlin
class Student(var name: String, val age: Int) {
  	//這裡可以使用constructor關鍵字繼續宣告次要建構子
  	//次要建構子中的參數僅僅是表示傳入的參數，不能像主建構子那樣定義屬性
  	//這裡的this表示是目前這個類，this()就是呼叫目前類的建構子
    constructor(name: String) : this(name, 18)  //這裡其實是呼叫主建構子，並且參數只有name，年齡直接給個預設值18
}
```

如果一個類沒有主建構子，那麼我們也可以直接在在類中編寫次要建構子，但是不需要主動委託一次主建構子，他這裡會隱式包含，所以說我們直接寫就行了：

```kotlin
class Student {
    constructor(name: String)  //注意，這裡的參數不是類屬性，僅僅是一個形參！
}
```

次要建構子和主建構子一樣，都可以用於物件的建立：

```kotlin
fun main() {
    val stu1 = Student("小明", 18)
    val stu2 = Student("小紅")
}
```

並且次要建構子可以編寫自訂的函式體：

```kotlin
open class Student {
    constructor(str: String) {   //在使用輔助建構子初始化物件時，會執行裡面的內容
        println("我的名字是: $str")
    }
}
```

因此，主建構子相比次要（輔助）建構子：

* **主建構子：** 可以直接在主建構子中定義類屬性，使用更方便，但是主建構子只能存在一個，並且無法編寫函式體，只有為類屬性做初始化賦值的效果。
* **輔助（次要）建構子：** 可以存在多個，並且可以自訂函式體，但是無法像主建構子那樣定義類屬性，並且當類具有主建構子時，所有次要建構子必須直接或間接地呼叫主建構子。

Kotlin語言本身比較靈活，類中並不是一定需要主建構子，全部寫輔助建構子也是可以的，但是再怎麼都得有建構子。

下一部分我們接著來討論物件的初始化。

### 物件的初始化

在物件建立時，我們可能需要做一些初始化工作，我們可以使用初始化程式碼塊來完成，初始化程式碼塊使用init關鍵字來完成。假如我們希望物件在建立的時候，如果年齡不足18歲，那麼就設定為18歲：

```kotlin
class Student(var name: String, var age: Int) {  //由於主建構子無法編寫函式體
  	//因此我們可以在init的花括號中編寫初始化程式碼
  	//注意這段初始化程式碼塊，是在上面的類屬性被賦值之後才執行的，所以說能拿到已經賦值的age屬性
    init {
        println("我是初始化操作")
        if(age < 18) age = 18
        println("初始化操作結束")
    }
}
```

這樣，我們在建立物件的時候，就會在建立的時候自動執行初始化程式碼塊裡面的程式碼：

```kotlin
fun main() {
    val stu = Student("小明", 15)
    println(stu.age)
}
```

可以看到初始化操作開始執行了：

![image-20230731181721090](https://s2.loli.net/2023/07/31/3CEnew5rgsTSlud.png)

初始化操作不僅僅可以有一個，也可以有很多個：

```kotlin
class Student {
    //注意，多個初始化操作時，從上往下按順序執行
    init {
        println("我是一號初始化操作")
    }

    init {
        println("我是二號初始化操作")
    }
}
```

對於將成員屬性寫到類中的情況，同樣是按照順序向下執行，比如：

![image-20230731195222026](https://s2.loli.net/2023/07/31/Bk56AGpSq28E4Y7.png)

因為成員變數a是在初始化程式碼塊的後面才初始化的，這裡會報錯。

如果一個類具有次要建構子，那麼我們也可以直接在次要建構子中編寫一些初始化程式碼：

```kotlin
class Student(var name: String, var age: Int) {
    constructor(name: String) : this(name, 18) {
        println("我是次要建構子中的語句")
    }
}
```

當我們使用對應的次要建構子時，就會執行次要建構子中的初始化程式碼了。

這裡需要注意一下，次要建構子實際上需要先執行主建構子，而在執行主建構子時，會優先將之前我們講解的初始化程式碼塊執行，比如下面的程式碼：

```kotlin
class Student(var name: String, var age: Int) {

    init {
        println("我是初始化程式碼塊")
    }

    constructor(name: String) : this(name, 18) {
        println("我是次要建構子")
    }
}
```

無論是有主建構子還是沒有主建構子（會生成一個預設的無參建構子）都會先執行。

### 類的成員函式

現在我們的類有了屬性，我們可以為建立的這些物件設定不同的屬性值，比如每個人的名字都不一樣，性別不一樣，年齡不一樣等等。只不過光有屬性還不行，物件還需要具有一定的行為，就像我們人可以行走，可以跳躍，可以思考一樣。

而物件也可以做出一些行為，我們可以透過定義函式來實現，類的函式和我們之前編寫的函式有一些區別，它是屬於這個類的，我們之前使用的函式都是直接編寫在Kt文件中，它們都是頂級函式。

```kotlin
class Student(var name: String, var age: Int) {
    //這個函用於跟大家打招呼
    fun hello(){
        println("大家好啊")
    }
}
```

要使用類的成員函式，我們只能透過物件來進行呼叫：

```kotlin
fun main() {
    val stu = Student("小明", 18)
  	//呼叫類中的成員方法，同樣使用.運算符即可
    stu.hello()  //讓小明這個物件給大家打招呼
}
```

是不是稍微有一些體會了？好像真的是我們在讓物件執行一個動作一樣。在類的成員函式中，我們可以直接訪問目前類物件中的一些屬性，比如我們這裡的使用者名稱和年齡：

```kotlin
class Student(var name: String, var age: Int) {
    fun hello(){
        println("大家好啊，我叫$name，今年${age}歲了")
    }
}
```

注意，這裡我們訪問的name和age屬性，是目前這個物件的name和age屬性。比如：

```kotlin
fun main() {
    val stu = Student("小明", 18)
    stu.hello()  //讓小明這個物件給大家打招呼

    val stu2 = Student("小紅", 17)
    stu2.hello()  //讓小紅這個物件給大家打招呼
}
```

![image-20220920101033325](https://s2.loli.net/2022/09/20/2vmhsCRXpPzojiD.png)

注意，下面這種情況，我們需要特殊處理：

```kotlin
class Student(var name: String, var age: Int) {
    //此時函式的參數也有一個name變數，而類的成員也有一個name屬性
    fun hello(name: String){
        //這裡得到的name是哪一個？
        println("大家好啊，我叫$name，今年${age}歲了")
    }
}
```

如果函式中的變數存在歧義，那麼優先使用作用域最近的一個，比如函式形參的name作用域更近，那麼這裡的name拿到的一個是形參name，而不是類的成員屬性name。

如果我們需要獲取的是類中的成員屬性，需要使用`this`關鍵字來表示目前類：

```kotlin
fun hello(name: String){
    //使用this關鍵字表示目前物件，這樣就可以指定這裡是類中的this了
    println("大家好啊，我叫${this.name}，今年${age}歲了")
}
```

預設情況下，如果作用域不衝突，使用類中屬性`this`可以省略。

在類中，我們同樣可以定義多個同名但不同參數的函式實現重載：

```kotlin
class Student(private var name: String, private var age: Int) {
    fun hello() = println("大家好啊，我叫${this.name}，今年${age}歲了")
    fun hello(gender: String) = println("大家好啊，我叫${this.name}，今年${age}歲了，性別${gender}")
}
```

實際上類中的函式使用起來跟我們之前定義的大差不差，只不過多了更多用法而已。

### 再談基本類型

在Kotlin中，萬物皆為物件，實際上我們在上一章學習的全部基本類型，都是官方為我們提供的類。

現在我們學習了類與物件的知識，就可以來重新認識一下這些基本類型，實際上這些基本類型同樣是類，也具有一些屬性，以及一些類中的成員函式。實際上在上一章中，我們就已經開始使用類和物件了，我們對這些基本類型的操作同樣是在操作物件：

```kotlin
fun main() {
    var a = 10   //這裡其實是一個Int類型的物件，值為10，而a持有的是對這個Int物件的引用
    var b = a    //這裡的b複製了對上面Int類型物件的引用
}
```

> **特別說明：**  在Kotlin中，雖然編碼時萬物皆物件，但是在最終編譯時，會根據上下文進行最佳化性能，大部分情況下會優先編譯為Java原生基本資料類型（不是物件）而另一部分情況下才會編譯為Java中的Integer包裝類型。因此很容易出現以下迷惑行為：
>
> ```kotlin
> val a: Int = 12345
> val b: Int = 12345
> println(a === b)   //true
> ```
>
> ```kotlin
> val a: Int? = 12345
> val b: Int? = 12345
> println(a === b)   //false
> ```
>
> 各位小伙伴可以在完整學習Java和後續Kotlin內容之後再來探究這個問題。

既然這些基本類型也是類，那麼肯定同樣具有成員屬性和成員函式，我們可以使用這些成員方法方便我們的項目開發，比如我們之前遇到的一個很麻煩的問題，不同類型的數無法相互轉換：

![image-20230731233455602](https://s2.loli.net/2023/07/31/gQAek7htrqdTxja.png)

這些時候可能我們需要將對應類型的資料轉換為其他類型，那麼該怎麼辦呢，實際上，在這些基本類型中都提供了對應類型轉換成員函式，這裡我們可以使用`toInt`來直接將Double類型的資料轉換為Int類型：

```kotlin
fun main() {
    var a: Int = 1.25.toInt()  //使用類中的類型轉換函式
}
```

這樣就可以編譯透過了。同樣的，每個基本類型都有對應的類型轉換函式，而且非常全面，比如Int類型：

![image-20230731233807465](https://s2.loli.net/2023/07/31/fEKUqiO5PmXBzdv.png)

有了這些成員函式，就大幅度方便了我們的類型轉換，再比如我們常見的String類型，也有很多函式可以使用：

```kotlin
fun main() {
    val a = "HelloWorld"
  	//使用lowercase和uppercase可以快速將字串中的字母進行大小寫轉換
    println(a.lowercase())
    println(a.uppercase())
}
```

不過需要注意的是，我們在前面就說過，字串一旦建立就是不可變的，因此，字串中所有的函式得到的新字串，都是重新建立的一個新的物件，而不是在原本的字串上進行修改。

我們繼續來看看一些有意思的函式，比如我們想批次取代字串中的某些內容：

```kotlin
fun main() {
    val a = "Hello World!"
    println(a.replace("o", "a"))
}
```

將字串中所有的字母`o`取代為`a`，直接使用replace函式就能直接生成取代之後的字串了。又比如我們要判斷某個字串是否以指定文字開頭：

```kotlin
fun main() {
    val a = "Hello World!"
    println(a.startsWith("Hel"))
}
```

可以看到這裡經過判斷得到了一個Boolean類型的結果，還有很多用於判斷字串是否為空、是否有空格等等的函式：

```kotlin
fun main() {
    val a = "Hello World!"
    a.isBlank()
    a.isEmpty()
}
```

我們還發現，這些基本類型中有一些比較特殊的函式，比如`plus`函式：

![image-20230801000753879](https://s2.loli.net/2023/08/01/Ax4VjEs2IJpadXy.png)

這個函式在類中定義長這樣：

```kotlin
public operator fun plus(other: Long): Long
```

這個函式添加了一個`operator`關鍵字，這個是什麼呢？這其實是運算符重載，能夠自訂運算符實現的功能，我們之前使用這些數字進行運算，比如加減乘除，實際上都是這些基本類型在類中重載了運算符實現的，下一部分，我們就來介紹一下運算符重載函式。

### 運算符重載函式

Kotlin支援為程式中已知的運算符集提供自訂實現，這些運算符具有固定的符號表示（如`+`或`*`）以及對應的優先度，要實現運算符重載，請為相應類型提供具有對應運算符指定名稱的成員函式，而目前的類物件，則直接作為對應運算符左邊的運算元，如果是一元運算符（比如++自增運算符，只需要本事）則直接作為運算元參與運算。

比如，現在我們想要為我們自訂的類型支援加法運算：

![image-20230801001740893](https://s2.loli.net/2023/08/01/kixuKBhcSawGHYX.png)

我們可以直接在類定義中添加一個固定名稱（名稱是預設好的，不能自己想寫什麼寫什麼）的函式，這裡的加法運算就是`plus`函式，我們直接開始編寫就可以了：

```kotlin
class Student(var name: String, var age: Int) {
    //注意，二元運算符必須帶一個形參，表示右側的運算元，返回值為計算出來的結果
  	//形參和結果可以是任意類型，我們還可以提供多次編寫同名的運算符重載函式來適配不同的類型
    operator fun plus(another: Student): Student{
        //比如這裡我們希望兩個學生物件相加，得到的結果為名字相加，年齡相加的一個新學生
        return Student(this.name + another.name, this.age + another.age)
    }
}
```

這樣，我們就成功重載了加法運算符，可以直接上手使用：

```kotlin
fun main() {
    val a = Student("小米", 18)
    val b = Student("華為", 19)
    val c = a + b
    println("運算之後得到的新學生，名稱：${c.name}，年齡：${c.age}")
}
```

是不是感覺很簡單？只需要將我們需要的對應運算符直接重載，編寫好對應的計算規則，就可以直接使用對應的運算符進行計算。

我們也可以試試看重載一些一元運算符，比如取反運算符：

```kotlin
class Student(var name: String, var age: Int) {
    //比如取反操作就是把目前學生的名字反過來
    operator fun not() : Student {
        this.name = this.name.reversed()
        //這裡可以直接在目前物件上進行操作，然後返回目前物件
        return this
    }
}
```

我們來嘗試使用一下：

```kotlin
fun main() {
  	//直接在這裡使用!運算符
    val a = !Student("小米", 18)
    println("運算之後得到的新學生，名稱：${a.name}，年齡：${a.age}")
}
```

最後，我們列出常見的一些運算符對應的函式名稱，首先是一元運算符：

| 符號  | 對應的函式名稱   |
| ----- | ---------------- |
| `+a`  | `a.unaryPlus()`  |
| `-a`  | `a.unaryMinus()` |
| `!a`  | `a.not()`        |
| `a--` | `a.dec()`+見下文 |
| `a++` | `a.inc()`+見下文 |

其中`inc()`和`dec()`函式比較特殊，它們必須返回一個值，該值將分配給使用`++`或`--`操作的變數，而不是改變執行`inc`或`dec`操作的物件，意思就是執行後應該得到一個新生成的物件，然後變數的值直接引用到這個新的物件，因為Int類型就是這樣的，比如`a++`的操作步驟如下：

- 將`a`的初始值儲存到臨時儲存`a0`。
- 將`a0.inc()`的結果分配給`a`。
- 返回`a0`作為表達式的結果。

同樣的，`++a`的操作步驟如下：

- 將`a.inc()`的結果分配給`a`。
- 作為表達式的結果返回`a`的新值。

認識完了一元運算符，我們接著來看一些基本二元運算符：

| 符號    | 對應的函式名稱    |
| ------- | ----------------- |
| `a + b` | `a.plus(b)`       |
| `a - b` | `a.minus(b)`      |
| `a * b` | `a.times(b)`      |
| `a / b` | `a.div(b)`        |
| `a % b` | `a.rem(b)`        |
| `a..b`  | `a.rangeTo(b)`    |
| `a..<b` | `a.rangeUntil(b)` |

| 符號      | 對應的函式名稱   |
| --------- | ---------------- |
| `a in b`  | `b.contains(a)`  |
| `a !in b` | `!b.contains(a)` |

對於`in`這種運算，必須返回Boolean類型的結果。

還有一些自增簡化運算符：

| 符號     | 對應的函式名稱     |
| -------- | ------------------ |
| `a += b` | `a.plusAssign(b)`  |
| `a -= b` | `a.minusAssign(b)` |
| `a *= b` | `a.timesAssign(b)` |
| `a /= b` | `a.divAssign(b)`   |
| `a %= b` | `a.remAssign(b)`   |

這類運算符都是將運算結果賦值給左邊的運算元，比如`a = a + b`等價於`a += b`，這種情況可能會與上面的基本操作產生歧義，比如下面的情況：

```kotlin
class Student(var name: String, var age: Int) {
		//同時定義plus和plusAssign
    operator fun plus(another: Student) : Student {
        return this
    }

    operator fun plusAssign(another: Student) : Unit{

    }
}
```

可以看到，上面的函式中，`plus`運算符在重載之後，運算結果與目前類型是相同的，這種情況下，就會出現一個問題：

* plus： 算式 a = a + b 可以成立，因為返回類型相同，可以重新賦值給a
* plusAssign：為算式 a = a + b 的縮寫，與plus的功能完全一致

此時，兩個函式都匹配這裡的運算符使用，編譯器不知道該用哪一個了，因此就會出現歧義：

![image-20230801004754437](https://s2.loli.net/2023/08/01/y9caS62ediVC8Ar.png)

比較運算符只需要實現一個函式即可：

| 運算符   | 對應的函式名稱        |
| -------- | --------------------- |
| `a > b`  | `a.compareTo(b) > 0`  |
| `a < b`  | `a.compareTo(b) < 0`  |
| `a >= b` | `a.compareTo(b) >= 0` |
| `a <= b` | `a.compareTo(b) <= 0` |

所有比較都會轉換為`compareTo`函式呼叫，此函式返回`Int`值，這個值用於判斷是否滿足條件。

Kotlin非常強大，甚至連小括號都能重載：

| 運算符             | 對應的函式名稱            |
| ------------------ | ------------------------- |
| `a()`              | `a.invoke()`              |
| `a(i)`             | `a.invoke(i)`             |
| `a(i, j)`          | `a.invoke(i, j)`          |
| `a(i_1, ..., i_n)` | `a.invoke(i_1, ..., i_n)` |

直接使用變數名稱+`()`來進行使用，感覺很像函式的呼叫，但是又不是，就很奇怪，不過確實很強大就是了。

還有一些運算符，以我們目前所學知識還無法進行講解，後續在各位小伙伴學習之後，可以回顧一下：

| 運算符                 | 對應的函式名稱            |
| ---------------------- | ------------------------- |
| `a[i]`                 | `a.get(i)`                |
| `a[i, j]`              | `a.get(i, j)`             |
| `a[i_1, ..., i_n]`     | `a.get(i_1, ..., i_n)`    |
| `a[i] = b`             | `a.set(i, b)`             |
| `a[i, j] = b`          | `a.set(i, j, b)`          |
| `a[i_1, ..., i_n] = b` | `a.set(i_1, ..., i_n, b)` |

這是索引訪問運算符，使用方括號進行表示。

### 中綴函式

實際上中綴函式在我們之前很多時候都有出現，比如位運算：

```kotlin
println(i shl 1)
```

這裡的`shl`並不是一個運算符，而是一段自訂的英文單字，像這種運算符是怎麼做到的呢？

這其實是中綴函式，用`infix`關鍵字標記的函式被稱為中綴函式，在使用時，可以省略呼叫的點和括號進行呼叫，Infix函式必須滿足以下要求：

- 必須是成員函式。
- 只能有一個參數。
- 參數不能有預設值。

我們可以像下面這樣編寫：

```kotlin
class Student(var name: String, var age: Int) {
  	//這個中綴函式實現了將給定字串與目前物件的名字拼接並返回
    infix fun test(string: String) : String{
        return name + string
    }
}
```

我們在使用時，也非常方便，真的就像在使用一個運算符一樣：

```kotlin
fun main() {
    val student = Student("小明", 18)
    println(student test "我愛你")
}
```

得到的結果顯而易見：

![image-20230821023203951](https://s2.loli.net/2023/08/21/L83otAYKWMEHmw1.png)

當然，我們也可以把它當做一個普通的函式進行呼叫，效果是完全等價的：

```kotlin
fun main() {
    val student = Student("小明", 18)
    println(student.test("崴泥"))
}
```

這裡需要注意一下：

> 中綴函式呼叫的優先度低於算術運算符、類型轉換和`rangeTo`運算符，例如以下表達式就是等效的：
>
> - `1 shl 2 + 3`相當於`1 shl (2 + 3)`
> - `0 until n * 2`相當於`0 until (n * 2)`
> - `xs union ys as Set<*>`相當於`xs union (ys as Set<*>)`（類型轉換會在下一章多態進行介紹）
>
> 另一方面，infix函式呼叫的優先度高於布爾運算符`&&`和`||`、`is`-和`in`-checks以及其他一些運算符的優先度。這些表達式也是等價的：
>
> - `a && b xor c`相當於`a && (b xor c)`
> - `a xor b in c`相當於`(a xor b) in c`

同時，如果需在類中使用中綴函式，必須明確函式的呼叫方（接收器）比如：

```kotlin
class MyStringCollection {
    infix fun add(s: String) { /*...*/ }

    fun build() {
        this add "abc"   // 正確
        add("abc")       // 正確
        //add "abc"        // 錯誤: 沒有指定呼叫方或無法隱式表達
    }
}
```

對於中綴函式的使用還是比較簡單的。

### 空值和空類型

所有的變數除了引用一個具體的值之外，還有一種特殊的值可以使用，那就是`null`，它代表空值，也就是不引用任何物件。

在其他語言中，比如Java中`null`是一個非常常見的值，因為在某些情況下，引用類型的變數預設值就是null，這就經常會導致程式中出現一些空指標導致的異常，在Kotlin中，對空值處理是非常嚴格的，正常情況下，我們的變數是不能直接賦值為`null`的，否則會報錯，無法編譯通過：

![image-20230801010807824](https://s2.loli.net/2023/08/01/4iWgGokCl9BmAjZ.png)

這是因為所有的類型預設都是非空類型，非空類型的變數是不允許被賦值為null的，這直接在編譯階段就避免了其他語言中經常存在的*空指標*問題。

那麼，如果我們希望某個變數在初始情況下使用`null`而不去引用某一個具體物件，該怎麼做呢，此時我們需要將變數的類型修改為可空類型，只需在類型名稱的後面添加一個`?`即可：

```kotlin
fun main() {
    var str: String? = null
}
```

既然現在是可空類型，那麼很多問題就會出現了，比如當一個變數為`null`時，此時如果使用類中的一些成員方法或是獲取成員屬性時，會出現一些問題：

![image-20230801011417154](https://s2.loli.net/2023/08/01/3Jjom5xSuRXFVzK.png)

這裡由於我們操作的是一個空類型，它有可能值為`null`，我們可以想像一下，如果一個變數不引用任何物件，此時我們又去讓物件做一些事情（執行函式）這不是在搞笑嗎，根本就沒這個物件，難道讓空氣去執行操作嗎？這顯然是不對的，這樣就會導致我們上面所說的空指標異常。

此時，為了安全，我們就需要對變數進行判斷，看看其是否為`null`然後才能去做一些正常情況下該做的事情：

```kotlin
fun main() {
    var str: String? = null
  	//這裡直接透過if語句判斷str變數是否為null，如果不是才執行
    if (str != null) {
        println(str.length)  //現在就可以編譯透過了
    }
}
```

可以看到，我們只要能確保某個空類型變數的值不為空，那麼就可以正常執行操作。當然，實際上在這個if內部，因為已經判斷不為null了，所以str被智慧類型轉換為非空類型，這也是Kotlin語言非常人性化的地方。

不過在有些情況下，我們可能已經非常清楚，這裡的str一定不為null，即使它是一個可空類型變數，我們可以像這樣做，來告訴編譯器，我們這裡一定是安全的，只管執行就好：

```kotlin
fun main() {
    var str: String? = null
  	//使用非空斷言操作符!!.來明確不會出現null問題
    println(str!!.length)
}
```

雖然使用非空斷言操作符能夠進行強制操作，但是這樣實際上並不安全，它同樣存在安全問題，也許我們有沒考慮到的情況會導致這裡為null呢，也說不定吧？對於一些我們拿不定具體會不會出現null的情況，有沒有更好的解決辦法呢？

Kotlin為我們提供了一種更安全的空類型操作，要安全地訪問可能包含`null`值的物件的屬性，請使用安全呼叫運算符`?.`，如果物件的屬性為`null`則安全呼叫運算符返回`null`，像下面這樣：

```kotlin
fun main() {
    var str: String? = null
    println(str?.length)
}
```

這裡的呼叫結果存在兩種情況：

* 如果str為null，那麼這裡得到的結果就是null，並且不會正常執行後面的操作
* 如果str不為null，那就正常返回這裡本應該得到的結果

因此，使用安全呼叫運算符後，如果遇到null的情況，那麼這裡不會正常進行原本的操作，而是直接返回`null`作為結果，這在有些時候非常好用，比如我們希望一個學生類型的變數在為`null`時就不執行對應的語句：

```kotlin
fun main() {
    val stu: Student? = null
    stu?.hello()
}
```

不過在有些時候，可能我們希望如果變數為null，在使用安全呼叫運算符時，返回一個我們自訂的結果，而不是null，這時該怎麼做呢？我們可以使用Elvis運算符：

```kotlin
fun main() {
    val str: String? = null
  	//Elvis運算符 ?: 左側為空值檢測目標，右側為檢測到null時返回的結果
    val len: Int = str?.length ?: 0
}
```

這裡我們使用了Elvis運算符來判斷左側是否為null，如果左側為null，那麼這裡直接得到右側的自訂值，這個運算符長得巨像其他語言裡面的三元運算符，Kotlin拿來做這事了。

### 解構宣告

有時候，我們在使用物件時可能需要訪問它們內部的一些屬性：

```kotlin
fun main() {
    val student = Student("小明", 18)
    println(student.name)  //訪問name屬性
    println(student.age)
}
```

這樣看起來不太優雅，有沒有更好的方式呢，比如這裡能不能直接得到Student物件內部的name和age熟悉作為變數使用？當然是可以的，我們可以直接像下面這樣編寫：

```kotlin
fun main() {
    val student = Student("小明", 18)
    val (a, b) = student   //從Student物件中將其屬性解構出來，很優雅
    println("名字: $a, 年齡: $b")
}
```

要讓一個類的屬性支援解構，我們只需添加約定的函式即可，在Kotlin中，我們可以自訂解構出來的結果，而具體如何獲取，需要定義一個componentN函式並透過返回值的形式返回解構的結果：

```kotlin
class Student(var name: String, var age: Int) {
    operator fun component1() = name   //使用component1表示解構出來的第一個參數
    operator fun component2() = age    //使用component2表示解構出來的第二個參數
  	operator fun component3...  //以此類推
}
```

添加用於解構的函式在之後，我們就可以使用解構操作了：

```kotlin
val (a, b) = student   //解構出來的參數按順序就是componentN的結果了
```

如果我們只想要使用第二個參數，而第一個參數不需要，可以直接使用`_`來忽略掉：

```kotlin
val (_, b) = student
println("年齡: $b")
```

解構同樣可以用在Lambda表達式中：

```kotlin
val func: (Student) -> Unit = { (a, b) ->  //使用括號包括結構出來的兩個參數
    println("名字: $a, 年齡: $b")
}

val func2: (Student, Int) -> Unit = { (a, b), i ->
    println("名字: $a, 年齡: $b")
    println(i)
}

val func3: (Student, Int) -> Unit = { (_, b), i ->
    println("名字: $a, 年齡: $b")
    println(i)
}
```

解構語法在遍歷集合類和陣列時同樣適用，我們會在後面進行講解。

### 包和匯入

在之前，無論我們建立的是Kotlin來源文件還是Kotlin類文件，都是在預設的包下進行的，也就是直接在kotlin/src目錄建立的。

但是有些時候，我們可能希望將一些模組按功能進行歸類，而不是所有的kt文件都擠在一起，這個時候我們就需要用到包了。

![image-20230821025349332](https://s2.loli.net/2023/08/21/iKuehJVcaDPBm82.png)

我們可以直接右鍵建立一個套裝軟體，套裝軟體的包名建議以域名格式進行命名，例如：

* com.baidu
* cn.itbaima

這類似於我們平時在瀏覽器中瀏覽的網站地址，只不過是反過來的，這樣就能很明確是哪一家公司或哪一個人製作的產品了。

這裡我們隨便建立一個：

![image-20230821025656614](https://s2.loli.net/2023/08/21/lOSupYdZo6ViKTF.png)

我們可以將kt文件直接建立在這個包中：

![image-20230821025738398](https://s2.loli.net/2023/08/21/eysHtBYJUOuxFcZ.png)

所有不在預設包下kt文件，必須在頂部宣告所屬的包，比如這裡的Test.kt就放在`com.test`這個包中，因此頂部必須使用package關鍵字進行包宣告，IDEA非常智慧，在建立時就自動幫助我們生成好了。我們可以繼續像之前一樣，編寫類或是函式：

```kotlin
package com.test

var a = 20

fun message() {
    println("我是測試方法")
}

class User 
```

不過，由於現在kt文件存放在了一個明確的包中，如果我們要在這個包以外的其他地方使用，會出現一些問題：

![image-20230821030210198](https://s2.loli.net/2023/08/21/wWjSMbEIxBz7OR6.png)

當我們使用其他包中kt文件定義的類或函式時，會直接提示未解析的引用，這是因為預設情況下只有同包內的內容可以相互使用，而現在我們使用的是其他包中的內容，我們需要先進行匯入操作：

```kotlin
import com.test.User   //使用import關鍵字進行匯入，匯入時需要輸入 包名.類型/頂級函式名稱 來完成
import com.test.message
import com.test.a

fun main() {
    val user = User()
    message()
}
```

這樣，我們在匯入之後就可以正常使用了，當然，如果一個包中定義的內容太多，我們需要大量使用，也可以使用`*`一次性匯入全部內容：

```kotlin
import com.test.*   //匯入此包下的全部內容

fun main() {
    val user = User()
    message()
}
```

實際上官方提供的庫，也是來自於不同的包，但是Kotlin在預設情況下會自動匯入一些包，不需要我們明確指定：

- [kotlin.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/index.html)
- [kotlin.annotation.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.annotation/index.html)
- [kotlin.collections.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/index.html)
- [kotlin.comparisons.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.comparisons/index.html)
- [kotlin.io.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.io/index.html)
- [kotlin.ranges.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.ranges/index.html)
- [kotlin.sequences.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.sequences/index.html)
- [kotlin.text.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/index.html)

比如我們之前用到的一些基本類型，都是在`kotlin`這個包中定義的。

![image-20230821030757225](https://s2.loli.net/2023/08/21/Zsi4CIT3XDz1QEY.png)

注意：在不同的平台下，還會有更多預設匯入的包，比如Java平台下，就會預設匯入`java.lang.*`和`kotlin.jvm.*`這兩個包。

在有些情況下，可能會出現名稱衝突的情況：

```kotlin
import com.test.message

fun main() {
    message()   //這裡呼叫的，到底是匯入的message函式，還是目前kt文件定義的函式呢？
}

fun message(){
    println("Goodbye World!")
}
```

結果顯而易見，這裡會優先使用匯入的函式，而不是在目前文件中定義的同名函式。那麼該如何去解決這種衝突的情況呢？我們可以使用`as`關鍵字來為匯入的內容取個新的名字：

```kotlin
import com.test.message as outer //將匯入的message函式名字改為outer

fun main() {
    message()   //此時這裡呼叫的就是下面的message函式了
}

fun message(){
    println("Goodbye World!")
}
```

這樣就可以很好地消除存在歧義的情況了，最後總結一下，使用`import`關鍵字支援匯入以下內容：

- 頂級函式和屬性
- 在單例物件中宣告的函式和屬性（下一章介紹）
- 列舉常量（下一章介紹）

### 訪問權限控制

有些時候，我們可能不希望別人使用我們的所有內容，比如：

```kotlin
package com.test

fun message() {
    println("我是測試方法")
}

fun inner(){
    //我們不希望這個函式能夠在其他地方被呼叫
}
```

在上面的例子中，有一個函式是我們不希望被外部呼叫的，但是經過前面的學習，我們只需要使用`import`關鍵字就能直接匯入，那有沒有辦法能夠控制一下其他地方對於目前文件一些可能私有函式或是其他內容的訪問呢？我們可以使用可見性控制來處理。

在類、物件、介面、建構子和函式，以及屬性上，可以為其添加 *可見性修飾符* 來控制其可見性，在Kotlin中有四個可見性修飾符，它們分別是：`private`、`protected`、`internal`和`public`，預設可見性是`public`，在使用頂級宣告時，不同可見性的訪問權限如下：

- 如果不使用可見性修飾符，則預設使用`public`，這意味著這裡宣告的內容將在任何地方可訪問。
- 如果使用`private`修飾符，那麼宣告的內容只能在目前文件中可訪問。
- 如果使用`internal`修飾符，它將在同一[模組](https://kotlinlang.org/docs/visibility-modifiers.html#modules)中可見（目前的項目中可以隨意訪問，與public沒大差別，但是如果別人引用我們的項目，那麼無法使用）
- 頂級宣告不支援使用`protected`修飾符。

因此，在預設情況下，我們定義的內容都是可以訪問的，而想要實現上面的效果，我們可以為其添加`private`修飾符：

```kotlin
private fun inner(){
    //我們不希望這個函式能夠在其他地方被呼叫
}
```

這樣，當其他地方使用時，就會報錯：

![image-20230821033355689](https://s2.loli.net/2023/08/21/poBbx9ytHW2nEi8.png)

在類中定義成員屬性時，不同可見性的訪問權限如下：

- `private`意味著該成員僅在此類中可見（包括其所有成員）
- `protected`與`private`的可見性類似，外部無法使用，但在子類中可以使用（子類會在下一章中介紹）
- `internal`意味著本項目中任何地方都會看到其`internal`成員，但是別人引用我們項目時不行。
- `public`意味著任何地方都可以訪問。

比如下面的例子：

```kotlin
class Student(private var name: String, //name屬性無法被外部訪問，因為是私有的
              internal var age: Int) {  //age可以被外部訪問，但是無法再其他項目中訪問到
    private constructor() : this("", 10)  //這個無參構造無法被外部訪問，因為是私有的
}
```

有了訪問控制，我們就可以更加明確地表示哪些內容是可以訪問，而哪些是內部使用的。

## 封裝、繼承和多態

封裝、繼承和多態是物件導向編程的三大特性。

> * 封裝，把物件的屬性和函式結合成一個獨立的整體，隱藏實現細節，並提供對外訪問的介面。
> * 繼承，從已知的一個類中衍生出一個新的類，叫子類。子類實現了父類所有非私有化的屬性和函式，並根據實際需求擴展出新的行為。
> * 多態，多個不同的物件對同一消息作出響應，同一消息根據不同的物件而採用各種不同的函式。

正是這三大特性，能夠讓我們的Kotlin程式更加生動形象。

### 類的封裝

封裝的目的是為了保證變數的安全性，使用者不必在意具體實現細節，而只是透過外部介面即可訪問類的成員，如果不進行封裝，類中的實例變數可以直接查看和修改，可能給整個程式帶來不好的影響，因此在編寫類時一般將成員變數私有化，外部類需要使用Getter和Setter函式來查看和設定變數。從這裡開始，我們前面學習的權限訪問控制就開始起作用了。

我們可以將之前的類進行改進：

```kotlin
class Student(private var name: String, private var age: Int) {
    fun getName(): String = name
    fun getAge(): Int = age
}
```

現在，外部需要獲取一個學生物件的屬性時，只能使用特定的函式進行獲取，而不像之前一樣可以隨意訪問物件的屬性：

```kotlin
fun main() {
    var student = Student("", 1)
    //student.name   這樣就不行了
    println(student.getName())
}
```

這樣的好處顯而易見，其他地方只能拿到在內部某個成員屬性引用的物件，而沒辦法像之前那樣直接修改Student物件中某個成員屬性。

同樣的，如果要執行外部對物件中的屬性進行修改，那麼我們也可以提供對應的set函式：

```kotlin
class Student(private var name: String, private var age: Int) {
    ...
    
    fun setName(name: String){   //使用set函式來修改
        this.name = name
    }
}
```

等等，這不就是我們之前講的屬性的getter和setter函式嗎，沒錯，哪怕我們不手動編寫，成員屬性也會存在預設的。但是，除了直接賦值之外我們也可以設定更多參數才能給學生改名字：

```kotlin
class Student(private var name: String, private var age: Int) {

    fun setName(name: String, upper: Boolean){
      	//判斷是否upper來決定最終賦值的名字大寫還是小寫
        this.name = if (upper) name.uppercase() else name.lowercase()
    }
}
```

我們自己封裝好的名字設定方法暴露給外部使用，而不讓外部直接操作名字。

我們甚至還可以將主建構子改成私有的，需要透過其他的建構子來構造：

```kotlin
class Student private constructor(private var name: String, private var age: Int) {
    constructor() : this("", 18)
}
```

封裝思想其實就是把實現細節給隱藏了，外部只需知道這個函式是什麼作用，如何去用，而無需關心實現，要用什麼由類自己提供好，而不需要外面來操作類內部的東西去完成（你讓我做一件事情，我自己的事情自己做，不要你來幫我安排）封裝就是透過訪問權限控制來實現的。

### 類的繼承

前面我們介紹了類的封裝，我們接著來看一個非常重要特性：繼承。

在定義不同類的時候存在一些相同屬性，為了方便使用可以將這些共同屬性抽象成一個父類，在定義其他子類時可以繼承自該父類，減少程式碼的重複定義，根據前面的訪問權限等級，子類可以使用父類中所有**非私有**的成員。

比如說我們一開始使用的學生，那麼實際上學生根據專業劃分，所掌握的技能也會不同，比如體育生會運動，美術生會畫畫，土木生會搬磚，電腦生會因為網路寒冬找不到工作，因此，我們可以將學生這個大類根據不同的專業進一步地細分出來：

![image-20230821192959617](https://s2.loli.net/2023/08/21/Swh4GDy6z9WxTIn.png)

雖然我們劃分出來這麼多的類，但是其本質上還是學生，也就是說學生具有的屬性，這些劃分出來的類同樣具有，但是，這些劃分出來的類同時也會擁有他們自己獨特的技能。就好比大學裡的學生無論什麼專業都會打遊戲，都會睡覺，翹課，考試抄答案，四六級過不了，只不過他們專業不同，學的的方向不一樣，也就掌握了其他專業不具備的技能。

在Kotlin中，我們可以使用繼承操作來實現這樣的結構，預設情況下，Kotlin類是“終態”的（不能被任何類繼承）要使類可繼承，請用`open`關鍵字標記需要被繼承的類：

```kotlin
open class Student {  //被繼承的類我們稱為父類
  	val xxx = "學生證"
    fun hello() = println("我會打招呼")
}
```

我們可以像下面這樣來建立一個繼承學生的類：

```kotlin
class ArtStudent : Student() {  //以呼叫建構子的形式進行宣告
  	//這個類就是Student類的子類
  	fun draw() = println("我會畫畫")   //子類中也可以繼續編寫自己獨有的函式
}
```

類的繼承可以不斷向下，但是同時只能繼承一個類，在Kotlin中不支援多繼承，只不過套娃還是可以的：

```kotlin
open class Student
open class ArtStudent: Student()  //繼承了一級，相當於Student的兒子
open class SuperArtStudent: ArtStudent()  //繼承了兩級，相當於Student的孫子
class SuperBigArtStudent: SuperArtStudent()  //繼承了三級，相當於Student的祖孫
```

當一個類繼承另一個類時，屬性會被繼承，可以直接訪問父類中定義的屬性，除非父類中將屬性的訪問權限修改為`private`，那麼子類將無法訪問（但是依然是繼承了這個屬性的）比如下面的例子：

```kotlin
fun main() {
    var student = ArtStudent()
    student.hello()   //雖然這裡是ArtStudent物件，但是由於其繼承的是Student，因此包含Student中的屬性
  	student.draw()   //自己的屬性也可以使用
  	print(student.xxx)   //不止函式，父類中的成員欄位也是沒有問題的
}
```

是不是感覺非常人性化，子類繼承了父類的全部能力，同時還可以擴展自己的獨特能力，就像一句話說的： 龍生龍鳳生鳳，老鼠兒子會打洞。這裡需要特別注意一下，因為子類相當於是父類的擴展，但是依然保留父類的特性，所以說，在物件建立並初始化的時候，不僅會對子類進行初始化，也會優先對父類進行初始化：

```kotlin
open class Student() {
    init { println("父類初始化") }
    fun hello() = println("我會打招呼")
}

class ArtStudent() : Student() {
    init { println("子類初始化") }
    fun draw() = println("我會畫畫")
}
```

實際上這裡就是在構造這個子類物件之前，呼叫了一次父類的建構子，而我們用於繼承指定的建構子，就是會被呼叫的那一個。

因此，如果父類存在一個有參建構子，子類同樣必須在建構子中呼叫：

```kotlin
open class Student(name: String, age: Int) {
    fun hello() = println("我會打招呼")
}

//子類必須適配其父類的建構子，因為需要先對父類進行初始化
//其實就是去呼叫一次父類的建構子，填入需要的參數即可，這裡的參數可以是目前子類構造方法的形參，也可以是直接填寫的一個參數
class ArtStudent(name: String, age: Int) : Student(name, 18) {
    fun draw() = println("我會畫畫")
}
```

如果父類存在多個建構子，可以任選一個：

```kotlin
open class Student() {
    constructor(str: String) : this()
    constructor(str: String, age: Int) : this()
    fun hello() = println("我會打招呼")
}

class ArtStudent : Student("小明", 18) {  //任選一個父類建構子即可
    fun draw() = println("我會畫畫")
}
```

當子類只存在輔助建構子時，需要使用super關鍵字來匹配父類的建構子：

```kotlin
open class Student {
    constructor(str: String)
    constructor(str: String, age: Int)
    fun hello() = println("我會打招呼")
}

//子類不寫主建構子時，可以直接在冒號後面添加父類類名
class ArtStudent : Student {
    constructor(str: String) : super(str)   //使用super來呼叫父類建構子,super表示父類（超類）
    constructor(str: String, age: Int) : super(str, age)
    fun draw() = println("我會畫畫")
}
```

也可以去匹配子類中其他建構子：

```kotlin
class ArtStudent : Student {
    constructor(str: String) : this(str, 18)   //也可以呼叫子類其他建構子，但是其他建構子依然要間接或直接呼叫父類建構子
    constructor(str: String, age: Int) : super(str, age)
    fun draw() = println("我會畫畫")
}
```

如果子類既有主建構子，也有輔助建構子，那麼其他輔助建構子只能直接或間接呼叫主建構子：

```kotlin
open class Student() {
    constructor(str: String) : this()
    constructor(str: String, age: Int) : this()
    fun hello() = println("我會打招呼")
}

class ArtStudent() : Student() {
    constructor(str: String) : this()  //正確，必須直接或間接呼叫主建構子
    constructor(str: String, age: Int) : super(str, age)   //報錯，不能繞過主建構子去匹配父類建構子
    fun draw() = println("我會畫畫")
}
```

是不是感覺玩法太多，都眼花撩亂了？實際上只要各位小伙伴心裡面清楚下面的規則，就很好理解上面這一堆寫法了：

* 建構子相當於是這個類初始化的最基本函式，在構造物件時一定要呼叫
* 主建構子因為可能存在一些類的屬性，所以說必須在初始化時呼叫，不能讓這些屬性初始化時沒有初始值
* 子類因為是父類的延展，因此，子類在初始化時，必須先初始化父類，就好比每個學生都有學生證，這是屬於父類的屬性，如果子類在初始化時可以不去初始化父類，那豈不是美術生可以沒有學生證？顯然是不對的。

優先度關係：父類初始化 > 子類主構造 > 子類輔助構造

### 屬性的覆蓋

有些時候，我們可以希望子類繼承父類的某些屬性，但是我們可能希望去修改這些屬性的預設實現。比如，美術生雖然也是學生，也會打招呼，但是可能他們打招呼的方式跟普通的學生不太一樣，我們能否對打招呼這個函式的預設實現進行修改呢？

我們可以使用`override`關鍵字來表示對於一個屬性的重寫（覆蓋）就像這樣：

```kotlin
open class Student {
  	//注意，跟類一樣，函式必須添加open關鍵字才能被子類覆蓋
    open fun hello() = println("我會打招呼")
}

class ArtStudent : Student() {
    fun draw() = println("我會畫畫")
  	//在子類中編寫一個同名函式，並添加override關鍵字，我們就可以在子類中進行覆蓋了，然後編寫自己的實現
    override fun hello() = println("哦哈喲")
}
```

覆蓋之後，當我們使用子類進行打招呼時，函式會按照我們覆蓋的內容執行，而不是原本的：

![image-20230823200019143](https://s2.loli.net/2023/08/23/jlMAVxCudRyi5gb.png)

同樣的，類的某個變數也是可以進行覆蓋的：

```kotlin
open class Student {
    open val test: String = "測試"
    fun hello() = println("我會打招呼: $test")  //這裡拿到的test就會變成被覆蓋掉的
}

class ArtStudent : Student() {
  	//對父類的變數進行覆蓋，類型必須一樣
    override val test: String = "幹嘛"
    fun draw() = println("我會畫畫")
}
```

是不是感覺很神奇？不過對於可變的變數，似乎下面這樣來的更方便？

```kotlin
open class Student {
    var test: String = "測試"
    fun hello() = println("我會打招呼: $test")
}

class ArtStudent : Student() {
    init { test = "幹嘛" }
    fun draw() = println("我會畫畫")
}
```

有些時候為了方便，比如在父類中的屬性，我們可以直接在子類的主建構子中直接覆蓋：

```kotlin
open class Student {
    open val name: String  = "大明"
    fun hello() = println("我會打招呼，我叫: $name")
}

//在主建構子中覆蓋，也是可以的，這樣會將構造時傳入的值進行覆蓋
class ArtStudent(override val name: String) : Student() {
    fun draw() = println("我會畫畫")
}
```

```kotlin
fun main() {
    val student = ArtStudent("小紅")
    student.hello()
}
```

雖然現在已經很方便了，但是現在又來了一個新的需求，打招呼不僅要有子類的特色，同時也要保留父類原有的實現，這個時候該怎麼辦呢？我們可以使用`super`關鍵字來完成：

```kotlin
open class Student {
    open fun hello() = println("我會打招呼")
}

class ArtStudent : Student() {
    fun draw() = println("我會畫畫")
    override fun hello() {   //覆蓋父類函式
        super.hello()   //使用super.xxx來呼叫父類的函式實現，這裡super同樣表示父類
        println("哦哈喲")  //再寫自己的邏輯
    }
}
```

這樣，我們在覆蓋原本的函式時，也可以執行原本的實現，在一些對函式內容進行增強的常見，這種用法非常常見：

![image-20230823201931679](https://s2.loli.net/2023/08/23/zv8s3d6cU7rGWQD.png)

不過，由於存在我們之前講解的的初始化順序，下面的這種情況需要特別注意：

```kotlin
open class Student {
    open val name: String = "小明"
    init { println("我的名字是: ${name.length}") }  //這裡拿到的name實際上是還未初始化的子類name
}

class ArtStudent : Student() {
    override val name = "大明"
}
```

```kotlin
fun main() {
    val student = ArtStudent()
}
```

由於父類初始化在子類之前，此時子類還未開始初始化，其覆蓋的屬性此時沒有初始值，根據不同平台的實現，可能會出現一些問題，比如JVM平台下，沒有初始化的物件引用預設為`null`，那麼這裡就會直接報空指標異常：

![image-20230823203609819](https://s2.loli.net/2023/08/23/nL7IlFWqGTvoPcd.png)

很神奇對吧，這裡的`name`屬性明明是一個非可空的String類型，居然還會出現`null`的情況報空指標，因此，對於這些使用了`open`關鍵字的屬性（函式、變數等）只要是在初始化函式、建構子中使用，IDEA都會給出警告：

![image-20230823204016350](https://s2.loli.net/2023/08/23/Us7gW92nhCQ5Dwr.png)

我們接著來講一個很繞的東西，在使用一些子類的時候，我們實際上可以將其當做其父類來進行使用：

```kotlin
fun main() {
    val student: Student = ArtStudent()   //使用Student類型的變數接收一個ArtStudent類型的物件引用
}
```

之所以支援這樣去使用，是因為子類本身就是對父類的延伸，因此將其當做父類使用，也是沒有問題的。就好比我們無論是美術生還是體育生，都可以當做學生來用，都可以送去廠裡實習打螺絲，不然不給畢業證。

只不過，如果我們將一個物件作為其父類使用，那麼在使用時也只能使用其父類的一些屬性，就相當於我們在使用一個父類的物件：

![image-20230823210031003](https://s2.loli.net/2023/08/23/esvFlg2aoAD1mNY.png)

即使我們很清楚這裡引用的物件是一個美術生，但是只能當做普通學生來用，這在後面的集合類中會經常用到，因為集合類往往存在多種不同的實現，但是我們只需要關心怎麼用就行了，並且為了方便更換實現，所以一般使用集合類對應的介面來作為變數的類型。

那麼，如果子類重寫了父類的某個函式，此時我們以父類的形式去使用，結果會怎麼樣？

```kotlin
open class Student {
    open fun hello() = println("大家好")
}

class ArtStudent : Student() {
    override fun hello() = println("我姓🐴我叫🐴厲害")
}
```

![image-20230823210424758](https://s2.loli.net/2023/08/23/uUd5f7amLbO2yhg.png)

可以看到，雖然當做父類來使用，但是其本質是不會變的，所以說，這裡執行的結果依然是子類的覆蓋實現。

那麼，如果項目中很多這種明明是子類但是拿來當做父類用，我們怎麼去判斷使用的物件到底是什麼類型的呢？我們可以使用`is`關鍵字來進行類型判斷，以下面的三個類為例：

```kotlin
open class Student
class ArtStudent : Student()
class SportStudent : Student() 
```

現在我們進行類型判斷：

```kotlin
fun main() {
    val student: Student = ArtStudent()
    println(student is ArtStudent)   //true，因為確實是這個類型
    println(student is SportStudent)   //false，因為不是這個類型
    println(student is Student)   //true，因為是這個類型的子類
}
```

可以看到，使用is關鍵字可以精準地對類型進行判斷，只要判斷的物件是這個類或是這個類的子類，那麼就會返回true作為結果。

如果我們明確某個變數引用的物件是什麼類型，可以使用`as`關鍵字來進行強制類型轉換：

```kotlin
fun main() {
    val student: Student = ArtStudent()
    if(student is ArtStudent) {
        val artStudent = student as ArtStudent;
        artStudent.draw()  //強制類型轉換之後，可以直接變回原本的類型去使用
    }
}
```

不過，編譯器非常智慧，它可以根據目前的語境判斷的類型自動進行類型轉換：

```kotlin
val student: Student = ArtStudent()
if(student is ArtStudent) {
    student.draw()
}
```

此時IDEA中會出現提示：

![image-20230823224118184](https://s2.loli.net/2023/08/23/VEp5huGfZxcnj61.png)

不僅僅是if判斷的場景、包括when、while，以及`&&` `||` 等運算符都支援智慧轉換，只要上下文語境符合就能做到：

```kotlin
fun main() {
    val student: Student? = ArtStudent()
  	//很明顯這裡是當student為ArtStudent時，根據語境直接智慧轉換
    while (student is ArtStudent)  student.draw()
    //很明顯如果這前面已經判斷為真了，那肯定是這個類型，後面也可以智慧轉換
  	if(student is ArtStudent && student.draw())
}
```

不僅僅是這種場景，比如我們前面講解的可空類型，同樣支援這樣的智慧轉換：

```kotlin
fun main() {
    val student: Student? = ArtStudent()
  	student?.hello()
    if (student != null)   //判斷到如果不為null
  			student.hello()  	 //根據語境student智慧轉換為了非空Student類型
}
```

在處理一些可空類型時，為了防止出現異常，我們可以使用更加安全的`as?`運算符：

```kotlin
fun main() {
    val student: Student? = ArtStudent()
    val artStudent: ArtStudent? = student as? ArtStudent  //當student為null時，不會得到異常，而是返回null作為結果
}
```

有了這些操作，類和物件在我們使用的過程中就逐漸開始千變萬化了，後面我們還會繼續認識更多的多態特性。

### 頂層Any類

在我們不繼承任何類的情況下，實際上Kotlin會有一個預設的父類，所有的類預設情況下都是繼承自Any類的。

這個類的定義如下：

```kotlin
/**
 * Kotlin類繼承結構中的根類. 所有Kotlin中的類都會直接或間接將Any作為父類
 */
public open class Any {
    /**
     * 判斷某個物件是否"等於"目前物件，這裡同樣是對運算符"=="的重載，而具體判斷兩個物件相等的操作需要由子類來定義
     * 在一些特定情況下，子類在重寫此函式時應該保證以下要求:
     * * 可反身: 對於任意非空值 `x`, 表達式 `x.equals(x)` 應該返回true
     * * 可交換: 對於任意非空值 `x` 和 `y`, `x.equals(y)` 當且僅當 `y.equals(x)` 返回true時返回true
     * * 可傳遞: 對於任意非空值 `x`, `y`, 和 `z`, 如果 `x.equals(y)` 和 `y.equals(z)` 都返回true, 那麼 `x.equals(z)` 也應該返回真
     * * 一致性: 對於任意非空值 `x` 和 `y`, 在多次呼叫 `x.equals(y)` 函式時，只要不修改在物件的“equals”比較中使用的資訊，那麼應當始終返回同樣的結果
     * * 永不等於空: 對於任意非空值 `x`, `x.equals(null)` 應該始終返回false
     */
    public open operator fun equals(other: Any?): Boolean

    /**
     * 返回目前物件的雜湊值，它具有以下約束:
     * 
     * * 對同一物件多次呼叫該函式時，只要不修改物件上的equals比較中使用的資訊，那麼此函式就必須始終返回相同的整數 
     * * 如果兩個物件透過`equals`函式判斷為true，那麼這兩個物件的雜湊值也應該相同
     */
    public open fun hashCode(): Int

    /**
     * 將此物件轉換為一個字串，具體轉換為什麼樣子的字串由子類自己決定
     */
    public open fun toString(): String
}
```

由於預設情況下類都是繼承自Any，因此Any中定義的函式也是被繼承到子類中了。

首先我們來看這個`equals`函式，它實際上是對`==`這個運算符的重載，我們之前在使用一些基本類型的時候，就經常使用`==`來判斷這些類型是否相同，比如Int類型的資料：

```kotlin
fun main() {
    val a = 10
    val b = 20
    println(a == b)
    println(a.equals(b))  //跟上面的寫法完全一樣
}
```

經過前面的學習，我們知道這些基本類型本質上也是定義的類，實際上它們也是透過重寫這個函式來實現這些比較操作的（一些基本類型會根據不同的平台進行編譯最佳化，沒辦法看原始碼）

我們可以看到，這個函式接受的參數類型是一個`Any?`類型：

```kotlin
public open operator fun equals(other: Any?): Boolean  //我們上節課說到一個子類也可以被當做父類類型的變數去使用，所以說equals判斷接受的參數為了滿足不同的類型變數之間進行比較，直接使用頂層Any作為參數（考慮到會用到可空類型，所以說直接用了Any?作為參數類型）
```

到目前為止，我們認識了Kotlin中兩種相等的判斷方式：

* *結果上* 相等 (`==` 等價於 `equals()`)
* *引用上* 相等 (`===` 判斷兩個變數是否都是引用的同一個物件)

我們在使用`equals`比較兩個可空物件是否相等時，就像這樣：

```kotlin
a == b
```

實際上會被翻譯為：

```kotlin
a?.equals(b) ?: (b === null)  //a如果為null那就直接判斷b是不是也為null，否則直接呼叫a的equals函式並讓b作為參數
```

當然可能會有小伙伴疑問，那不等於判斷呢？實際上是一樣的：

```kotlin
fun main() {
    val a = "10"
    val b = "20"
    println(a != b)
    println(!a.equals(b))  //等價於上面的寫法
}
```

我們也可以為我們自己編寫的類型重寫`equals`函式，比如我們希望Student類型當名字和年齡相等時，就可以使用`==`來判斷為true，我們可以像這樣編寫：

```kotlin
class Student(val name: String, val age: Int) {
    override fun equals(other: Any?): Boolean {
        if(this === other) return true  //如果引用的是同一個物件，肯定是true不多逼逼
        if(other !is Student) return false //如果要判斷的物件根本不是Student類型的，那也不用繼續了
        if(name != other.name) return false  //判斷名字是否相同
        if(age != other.age) return false  //判斷年齡是否相同
        return true   //都沒問題，那就是相等了
    }
}
```

此時我們已經將其比較操作重寫，我們可以來試試看：

```kotlin
fun main() {
    val a = Student("小明", 18)
    val b = Student("小紅", 17)
    val c = Student("小明", 18)
    println(a == a)    //返回true因為就是自己
    println(a == b)    //返回false因為名字和年齡不一樣
    println(a == c)    //返回true因為名字和年齡完全一樣
}
```

預設情況下，如果我們不重寫類的`equals`函式，那麼會直接對等號兩邊的變數進行引用判斷`===`判斷是否為同一個物件。只不過，可以很清楚地看到IDEA提示我們：

![image-20230903022730000](https://s2.loli.net/2023/09/03/I8UKfnoGTDJ5bmt.png)

實際上在我們重寫類的`equals`函式時，根據約定，必須重寫對於的hashCode函式，至於為什麼，我們會在後續的集合類部分中進行介紹，這裡我們暫時先不對hashCode函式進行講解。

接著我們來看下一個，`toString`函式用於快速將物件轉換為字串，只不過預設情況下，會像這樣：

```kotlin
fun main() {
    val a = Student("小明", 18)
    println(a.toString())
    println(a)  //println預設情況下會直接呼叫物件的toString並列印，所以跟上面是一樣的
}
```

![image-20230903024131154](https://s2.loli.net/2023/09/03/1C97zSp6YtWm5h2.png)

可以看到列印的結果是物件的`類型@十六進制雜湊值`的形式，在某些情況下，可能我們更希望的是轉換物件的一些成員屬性，這樣我們可以更直觀的看到物件的屬性具有什麼值：

```kotlin
class Student(val name: String, val age: Int) {
    override fun toString(): String {  //直接重寫toString函式
        return "Student(name='$name', age=$age)"
    }
}
```

現在得到的結果，就是我們自訂的結果了：

![image-20230903024524946](https://s2.loli.net/2023/09/03/MoePNY7UEz6xRmf.png)

### 抽象類

有些情況下，我們設計的類可能僅僅是作為給其他類繼承使用的類，而其本身並不需要建立任何實例物件，比如：

```kotlin
open class Student protected constructor() {  //無法構造這個父類，要求使用子類
    open fun hello() = println("Hello World!")
}
class ArtStudent: Student() {
    override fun hello() = println("原神")  //兩個子類都對hello進行了實現，採用各自的方式
}
class SportStudent: Student() {
    override fun hello() = println("啟動")
}
```

可以看到，在上面這個例子中，Student類的`hello`函式在子類中都會被重寫，所以說除非在子類中呼叫父類的預設實現，否則一般情況下，父類中定義的函式永遠都不會被呼叫。

就像我們說一個學生會怎麼考試一樣，實際上學生怎麼考試是一個抽象的概念，但是由於學生的種類繁多，美術生怎麼考試和體育生怎麼考試，才是具體的一個實現。所以說，我們可以將學生類進行進一步的抽象，讓某些函式或欄位完全由子類來實現，父類中不需要提供實現。我們可以使用`abstract`關鍵字來將一個類宣告為抽象類：

```kotlin
//使用abstract表示這個是一個抽象類
abstract class Student {
    abstract val type: String  //抽象類中可以存在抽象成員屬性
    abstract fun hello()   //抽象類中可以存在抽象函式
  	//注意抽象的屬性不能為private，不然子類就沒辦法重寫了
}
```

當一個子類繼承自抽象類時，必須要重寫抽象類中定義的抽象屬性和抽象函式：

```kotlin
class ArtStudent: Student() {
    override val type: String = "美術生"
    override fun hello() = println("原神，啟動！")
}
```

這是強制要求的，如果不進行重寫將無法透過編譯。同時，抽象類是不允許直接構造物件的，只能使用其子類：

![image-20230903031350955](https://s2.loli.net/2023/09/03/viBCqHg64TZyAsN.png)

當然，抽象類不僅可以具有抽象的屬性，同時也具有普通類的性質，同樣可以定義非抽象的屬性或函式：

```kotlin
abstract class Student {
    abstract val type: String
    abstract fun hello()
    fun test() = println("不會有人玩到大三了才開始學Java吧")  //定義非抽象屬性或函式，在子類中不強制要求重寫
}
```

同時，抽象類也可以繼承自其他的類（可以是抽象類也可以是普通類）

```kotlin
open class Test   //直接繼承一個普通的類
abstract class Student: Test(){
    ...
}
```

雖然抽象類可以繼承一個普通的類，但是這依然不改變它是抽象類的本質，子類依然要按照上面的要求進行編寫。

### 介面

由於Kotlin中不存在多繼承的操作，我們可以使用介面來替代。

前面我們認識了抽象類，它可以具有一些定義而不實現的內容，而介面比抽象類還要抽象，一般情況下，他只代表某個確切的功能！也就是只能包含函式或屬性的定義，所有的內容只能是`abstract`的，它不像類那樣完整。介面一般只代表某些功能的抽象，介面包含了一系列內容的定義，類可以實現這個介面，表示類支援介面代表的功能。

比如，學生具有以下功能：

* 打遊戲
* 睡懶覺
* 翹課
* 考試作弊

我們可以將這一系列功能分割成一個個的介面，然後讓學生實現這些介面，來表示學生支援這些功能。

在Kotlin中，要宣告介面，我們可以使用`interface`關鍵字：

```kotlin
interface A {
    val x: String  //介面中所有屬性預設都是abstract的（可省略關鍵字）
    fun sleep()   //介面中所有函式預設都是abstract的（可省略關鍵字）
}
interface B {
    fun game()
}
class Student: A, B {   //介面的實現與類的繼承一樣，直接寫到後面，多個介面用逗號隔開
    override val x: String = "測試"   //跟抽象類一樣，介面中的內容是必須要實現的
    override fun sleep() = println("管他什麼早八不早八的，睡舒服再說")
    override fun game() = println("讀大學就該玩遊戲玩到爽")
}
```

可以看到，介面相比於抽象類來說，更加的純粹，它不像類那樣可以具有什麼確切的屬性，一切內容都是抽象的，只能由子類來實現。

只不過，在介面中宣告的屬性可以是抽象的，也可以為Getter提供預設實現。在介面中宣告的屬性無法使用`field`後背欄位，因此在介面中宣告的Setter無法使用`field`進行賦值：

```kotlin
interface A {
    val x: String
        get() = "666"  //只能重寫getter，不能直接賦值，因為預設情況下getter是返回的field的值，但是介面裡不讓用
}
```

```kotlin
interface A {
    var x: String
        get() = "666"
        set(value) {  /* 預設的setter會直接報錯，因為使用了field欄位 */ }
}
```

為了應對變化多端的需求，介面也可以為函式編寫預設實現：

```kotlin
interface A {
    //介面中的函式可以具有預設實現，預設情況下是open的，除非private掉
    fun sleep() = println("管他什麼早八不早八的，睡舒服再說")
}
```

這樣一看，這函式可以寫預設的實現那介面似乎變得不那麼抽象了？這用著感覺好像跟抽象類沒什麼區別啊？介面跟類的最大區別其實就是狀態的儲存，這從上面的成員屬性我們就可以看的很清楚。

介面也可以繼承自其他介面，直接獲得其他介面中的定義：

```kotlin
interface A{
    fun sleep() = println("管他什麼早八不早八的，睡舒服再說")
}
interface B{
    fun game() = println("讀大學就該玩遊戲玩到爽")
}
interface C: A, B   //介面的繼承寫法是一樣的，並且介面繼承介面是支援多繼承的
class Student: C    //直接獲得ABC三個介面的功能
```

是不是感覺介面的玩法非常有意思？只不過玩的過程中，可能也會遇到一些麻煩，比如下面的這種情況：

```kotlin
interface A{
    fun sleep() = println("管他什麼早八不早八的，睡舒服再說")
}
interface B{
    fun sleep() = println("7點起床學Java了，不能再睡了")
}
class Student: A, B  //由於A和B都具有sleep函式，那現在到底繼承誰的呢？
```

這種情況下，我們需要手動解決衝突，比如我們希望Student類採用介面B的預設實現：

```kotlin
class Student: A, B {
    override fun sleep() {  //手動重寫sleep函式，自行決定如何處理衝突
        super<B>.sleep()  //使用super關鍵字然後添加角括號指定對應介面，並手動呼叫介面對應函式
    }
}
```

對於介面，我們可以像之前一樣，將變數的類型設定為一個介面的類型，當做某一個介面的實現來使用，同時也支援`is`、`as`等關鍵字進行類型判斷和轉換：

```kotlin
fun main() {
    val a: A = Student()
    a.sleep()  //直接當做A介面用（只能使用A介面中定義的內容）
    println(a is B)  //判斷a引用的物件是否為B介面的實現類
}
```

是不是感覺跟之前使用起來是差不多的？其實只要前面玩熟悉了，後面還是很簡單的。

### 類的擴展

Kotlin提供了擴展類或介面的操作，而無需透過類繼承或使用*裝飾器*等設計模式，來為某個類添加一些額外的函式或是屬性，我們只需要透過一個被稱為*擴展*的特殊宣告來完成。

例如，您可以從無法修改的第三方庫中為類或介面編寫新函式，這些函式可以像類中其他函式那樣進行呼叫，就像它們是類中的函式一樣，這種機制被稱為*擴展函式*。還有*擴展屬性*，允許您為現有類定義新屬性。

比如我們想為String類型添加一個自訂的操作：

```kotlin
//為官方的String類添加一個新的test函式，使其返回自訂內容
fun String.test() = "666"

fun main() {
    val text = "Hello World"
    println(text.test())  //就好像String類中真的有這個函式一樣
}
```

![image-20231224000802923](https://s2.loli.net/2023/12/24/A84ftRYmKgklz9F.png)

是不是感覺很神奇？透過這種機制，我們可以將那些第三方類不具備的功能強行進行擴展，來方便我們的操作。

注意，類的擴展是靜態的，實際上並不會修改它們原本的類，也不會將新成員插入到類中，僅僅是將我們定義的功能變得可呼叫，使用起來就像真的有一樣。同時，在編譯時也會明確具體呼叫的擴展函式：

```kotlin
open class Shape
class Rectangle: Shape()

fun Shape.getName() = "Shape"
fun Rectangle.getName() = "Rectangle"  //雖然這裡同時擴展了父類和子類的getName函式

fun printClassName(s: Shape) {  //但由於這裡指定的類型是Shape，因此編譯時也只會使用Shape擴展的getName函式
    println(s.getName())
}

fun main() {
    printClassName(Rectangle())
}
```

由於類的擴展是靜態的，因此在編譯出現歧義時，只會取決於形參類型。

如果是類本身就具有同名同參數的函式，那麼擴展的函式將失效：

```kotlin
class Test {
    fun hello() = println("你幹嘛")
}

fun Test.hello() = println("哎喲")

fun main() {
    Test().hello()   //你幹嘛
}
```

不過，我們如果透過這種方式實現函式的重載，是完全沒有問題的：

```kotlin
class Test {
    fun hello() = println("你幹嘛")
}

fun Test.hello(str: String) = println(str)  //重載一個不同參數的同名函式

fun main() {
    Test().hello("不錯")  //有效果
}
```

同樣的，類的屬性也是可以透過這種形式來擴展的，但是有一些小小的要求：

![image-20231224133250495](https://s2.loli.net/2023/12/24/xcOf9EGpIgWCiuw.png)

可以看到直接擴展屬性是不允許的，前面我們說過，擴展並不是真的往類中添加屬性，因此，擴展屬性本質上也不會真的插入一個成員欄位到類的定義中，這就導致並沒有變數去儲存我們的資料，我們只能明確定義一個getter和setter來建立擴展屬性，才能讓它使用起來真的像是類的屬性一樣：

```kotlin
val Student.gender: String
    get() = "666"

fun main() {
    val stu = Student()
    println(stu.gender)
}
```

> 由於擴展屬性並沒有真正的變數去儲存，而是使用get和set函式來實現，所以，像前面認識的field這種後備欄位，就無法使用了。

![image-20231224140003005](https://s2.loli.net/2023/12/24/tcWgufYbXw6rMFa.png)

還有一個需要注意的時，我們在不同包中定義的擴展屬性，同樣會受到訪問權限控制，需要進行匯入才可以使用：

```kotlin
import com.test.gender

fun main() {
    val stu = Student()
    println(stu.gender)
}
```

除了直接在頂層定義類的擴展之外，我們也可以在一個類中定義其他類的擴展，並且在定義時可以直接使用其他類提供的屬性：

```kotlin
class A {
    fun hello() = "Hello World"
}

class B {
    fun A.test() {
        hello()   //直接在類A的擴展函式中呼叫A中定義的函式
    }
}
```

像這種擴展，由於是在類中定義，因此也僅限於類內部使用，比如：

```kotlin
class A {
    fun hello() = "Hello World"
}

class B (private val a: A){
    private fun A.test() = hello() + "!!!"
    fun world() = println(a.test())   //只能在類中透過A的實例使用擴展函式
}

fun main() = B(A()).world()
```

擴展屬性無法訪問那些本就不應該被目前作用域訪問的類屬性，即使它是對某個類的擴展，比如下面這種情況：

![image-20231224142935236](https://s2.loli.net/2023/12/24/WqImXYiLKoTvPMh.png)

在名稱發生衝突時，需要特別處理：

```kotlin
class A {
    fun hello() = "Hello World"
}

class B (private val a: A){
    private fun A.test() {
        hello()   //直接使用優先匹配被擴展類中的方法
        this.hello()   //擴展函式中的this依然指的是被擴展的類物件
        this@B.hello()   //這裡呼叫的才是下面的
    }

    fun hello() = "Bye World"
}
```

定義在類中的擴展也可以跟隨類的繼承結構，進行重寫：

```kotlin
open class A {
    open fun Student.test() = "AAA"
    fun hello() = println(Student().test())
}

class B : A() {
    override fun Student.test() = "BBB"  //對父類定義的擴展函式進行重寫
}

fun main() {
    A().hello()
    B().hello()
}
```

局部擴展也是可以的，我們可以在某個函式裡面編寫擴展，但作用域僅限於目前函式：

```kotlin
fun main() {
    fun String.test() = ""
    "".test()
}
```

如果我們將一個擴展函式作為參數給到一個函式類型變數，那麼同樣需要再具體操作之前增加類型名稱才可以：

```kotlin
fun main() {
  	//因為是對String類型的擴展函式，需要String.前綴
    val func: String.() -> Int = {
        this.length   //跟上面一樣，擴展函式中的this依然指的是被擴展的類物件
    }
    println("sahda".func())  //可以直接對符合類型的物件使用這個函式
  	func("Hello")  //如果是直接呼叫，那麼必須要傳入對應類型的物件作為首個參數，此時this就指向我們傳入的參數
}
```

可以看到，此函式的類型是`String.() -> Int `，也就是說它是專門針對於String類型編寫的擴展函式，沒有參數，返回值類型為Int，並使用Lambda表達式進行賦值，同時這個函式也是屬於String類型的，只能由物件呼叫，或是主動傳入一個相同類型的物件作為參數才能直接呼叫。可能這裡會有些繞不太好理解，需要同學們多去思考。

總結一下，擴展屬性更像是針對於原本類編寫的外部工具函式，而絕不是對原有類的修改。


————————————————
版權聲明：本文為柏碼知識庫版權所有，禁止一切未經授權的轉載、發布、出售等行為，違者將被追究法律責任。
原文連結：https://www.itbaima.cn/document/t7lnl87f74f3v1ju