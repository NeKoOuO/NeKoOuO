![image-20230821184810141](https://s2.loli.net/2023/08/21/g6flcuWhX7xK41z.png)

# Kotlin程式設計進階篇

在學習了前面的內容之後，相信各位小伙伴應該對Kotlin這門語言有了一些全新的認識，我們已經了解了大部分的基本內容，從本章開始，就是對我們之前所學的基本內容的進一步提升。

## 泛型

在前面我們學習了最重要的類和物件，了解了物件導向編程的思想，注意，非常重要，物件導向是必須要深入理解和掌握的內容，不能草草結束。在本章節，我們還會繼續深入，從泛型開始，再到我們的集合類學習，循序漸進。

### 什麼是泛型

為了統計學生成績，要求設計一個Score物件，包括課程名稱、課程號、課程成績，但是成績分為兩種，一種是以`優秀、良好、合格` 來作為結果，還有一種就是 `60.0、75.5、92.5` 這樣的數字分數，可能高等數學這門課是以數字成績進行結算，而電腦網路實驗這門課是以等級進行結算，這兩種分數類型都有可能出現，那麼現在該如何去設計這樣的一個Score類呢？

現在的問題就是，成績可能是`String`類型，也可能是`Int`類型，如何才能更好的去存可能出現的兩種類型呢？

```kotlin
class Score(var name: String, var id: String, var value: Any) {
    //因為Any是所有類型的父類，因此既可以存放Int也能存放String
}

fun main() {
    Score("資料結構與演算法基礎", "EP074512", "優秀")  //文字和數字都可以存
    Score("電腦作業系統", "EP074533", 95)
}
```

雖然這樣看起來很不錯，但是Any畢竟是所有類型的頂級父類，在編譯階段並不具有良好的類型判斷能力，很容易出現以下的情況：

```kotlin
fun main() {
    val score = Score("資料結構與演算法基礎", "EP074512", "優秀")
  	...
    val a: Int = score.value as Int   //獲取成績需要進行強制類型轉換
}
```

使用Any類型作為引用雖然可以做到任意類型儲存，但是對於使用者來說，由於是Any類型，所以說並不能直接判斷儲存的類型到底是String還是Int，取值只能進行強制類型轉換，顯然無法在編譯期確定類型是否安全，項目中程式碼量非常之大，進行類型比較又會導致額外的開銷和增加程式碼量，如果不經比較就很容易出現類型轉換異常，程式碼的健壯性有所欠缺。

所以說這種解決辦法雖然可行，但並不是最好的方案，我們需要使用一個更好的東西來實現： **泛型**

泛型其實就一個待定類型，我們可以使用一個特殊的名字表示泛型，泛型在定義時並不明確是什麼類型，而是需要到使用時才會確定對應的泛型類型，Kotlin中的類可以具有類型參數：

```kotlin
class Score<T>(var name: String)
//這裡的T就是一個待定的類型，同樣是這個類具有的，我們稱為泛型參數
```

可以看到，它相比普通的類型，僅僅多了一個`<T>`表示類型參數，那麼如何使用呢？

```kotlin
fun main() {
  	//在建立物件時，再來明確使用的是什麼類型，同樣使用角括號填寫
    val score = Score<Int>("資料結構與演算法")
}
```

既然可以做到使用時明確，那現在我們應該怎麼去設計這個類呢？

```kotlin
class Score<T>(var name: String, var id: String, var value: T)
//我們在定義類型參數後，T就是一個待定類型，我們可以直接將value屬性的類型定義為T

fun main() {
    val score = Score<String>("資料結構與演算法基礎", "EP074512", "優秀")  
  	//在使用時，使用<String>來明確Score的值類型，此時value的類型也會變成String
    val value: String = score.value  //得到的直接就是String類型的結果
}
```

泛型將資料類型的確定控制在了編譯階段，在編寫程式碼的時候就能明確泛型的類型，如果類型不符合，將無法透過編譯，同時，如果我們這裡填入的參數明確是一個String類型的值，建立時不需要指定T的類型也會自動匹配：

```kotlin
val score = Score("資料結構與演算法基礎", "EP074512", "優秀")  //自動匹配為String類型
```

而泛型類型在類內部使用時，由於無法確定具體類型，也只能當做Any類去使用：

![image-20231224145801613](https://s2.loli.net/2023/12/24/HydGER9k7pleIbM.png)

因為泛型本身就是對某些待定類型的簡單處理，如果都明確要使用什麼類型了，那大可不必使用泛型。還有，不能透過這個不確定的類型變數就去直接建立物件：

![image-20231224145942619](https://s2.loli.net/2023/12/24/bvEcJO6hzWVILm7.png)

還有，由於泛型在建立時就已經確定，因此即使都是Score類，由於類型參數的不同也會導致不通用：

![image-20231224150118514](https://s2.loli.net/2023/12/24/XiAGHKbeaMDcTt6.png)

有了泛型之後，我們再來使用一些類型就非常方便了，並且泛型並不是每個類只能存在一個，我們可以一次性定義多個類型參數：

```kotlin
class Test<K, V>(val key: K, val value: V)
```

多個不同的類型參數代表不同的類型，這些都可以在使用時明確，並且互不影響。

> Kotlin還提供了下劃線運算符可以自動推斷類型：
> ```kotlin
> fun <K: Comparable<V>, V> test() {  }   //類型參數中第一個類型參數可以直接推斷得到
> 
> fun main() {
>     test<Int, _>()  //由於前面的類型本身就是Comparable<Int>的子類，已經明確了V的類型，後面就沒必要再寫一次了，直接使用下劃線運算符進行推斷即可
> }
> ```
>
> 感覺使用場景應該比較少，了解就行。

當然，不只是類，包括介面、抽象類，都是可以支援泛型的：

```kotlin
interface Test<T> {
    
}
```

子類在繼承時，可以選擇將父類的泛型參數給明確為某一類型，或是使用子類定義的泛型參數作為父類泛型參數的實參使用：

```kotlin
abstract class A<T> {
    abstract fun test(): T
}

class B: A<String>() {  //子類直接明確為String類型
    override fun test(): String = "Hello World" //明確後所有用到泛型的地方都要變成具體類型
}

abstract class C<D>: A<D>() {  //子類也有泛型參數D
    abstract override fun test(): D
}

fun main() {
    val b = B()
    println(b.test())
}
```

除了在類上定義泛型之外，我們也可以在函式上定義：

```kotlin
//在函式名稱前添加<T>來增加類型參數，之後函式的返回值或是參數都可以使用這個類型
fun <T> test(t: T): T = t

fun main() {
    val value: String = test("Hello World")  //呼叫函式時自動明確類型
}
```

甚至在使用函式類型的參數時，我們可以使用泛型來代表不確定的類型：

```kotlin
fun <T> test(func: (Int) -> T) : T {  //只要是有類型的地方都可以用T代替
 		...
}

fun <T> test2(func: T.() -> Unit) {  //甚至還可以是T類型的擴展函式
		...
}
```

在這之後，我們還會遇到更多官方提供的泛型函式，尤其是下一章的陣列和集合部分。

### 官方高階擴展函式

為了我們開發的便利，官方提供了一系列內建的高階函式，大部分都是透過擴展函式形式定義，我們可以使用來簡化我們的程式碼。

我們之前在使用時或許就已經發現了：

![image-20231224174024496](https://s2.loli.net/2023/12/24/Arojew9z7OnYigW.png)

那麼怎麼依靠它們來簡化我們的程式碼呢？比如下面的程式碼：

```kotlin
class Student(var name: String, var age: Int) {
    fun hello() = println("大家好，我是$name")
}

fun test(student: Student?): Student? {
    student?.name = "小明"  //不優雅！！！！
    student?.age = 18
    student?.hello()
  	returun student;
}
```

由於傳入的是一個可空類型，這導致我們在使用時非常不方便，每次都需要進行判斷，有沒有更優雅一點的方式來處理呢？

```kotlin
fun test(student: Student?): Student? = student?.apply {
    this.name = "小明"
    this.age = 18
    this.hello()
}
```

太優雅了，同樣的操作，原本繁雜的呼叫直接簡化成了簡單的幾句程式碼，真是舒服啊！

我們來介紹一下這些函式時如何使用的，這裡以apply為例，這個函式功能是簡化我們對某個物件的操作並在最後返回物件本身，在Standard.kt中是這樣定義的：

```kotlin
public inline fun <T> T.apply(block: T.() -> Unit): T {
    ...
    block()   //呼叫我們傳入的函式
    return this   //返回目前T類型物件本身
}
```

可以看到，這個函式也是以擴展函式定義的T可以代表任何類型，所有的類都可以使用這個預設的擴展函式，並且它的參數是一個`T.() -> Unit`函式類型的，很明顯這是一個高階函式，並且最後一個參數就是函式類型，後續可以結合我們之前講解的簡化程式碼。

這個參數非常有意思，比如我們原來需要這樣編寫：

```kotlin
fun main() {
    val student: Student = Student("小明", 18)
    student.name = "大明"
    student.hello()
}
```

我們現在可以進行程式碼最佳化：

```kotlin
fun main() {
    Student("小明", 18).apply { 
        this.name = "大明"
    }.hello()
}
```

什麼鬼，怎麼突然就變得這麼簡單了？我們一個一個來看：

```kotlin
Student("小明", 18).apply{  }  //呼叫Apply後，我們需要傳入一個Lambda表達式，也就是我們要如何操作這個物件
```

我們可以直接將對這個物件全部的操作搬進來，然後在一個Lambda裡面就能完成，接著我們對這個物件的其他操作，可以直接在後續編寫，因為返回的也是這個物件本身，所以，使用這些預設的高階函式，在很多情況下都能省掉我們不少程式碼量。

這裡我們來看幾個比較常用的：

1. `let`：用於執行一個lambda表達式並將得到的結果作為返回值返回。

   ```kotlin
   //對目前物件進行操作，得到一個新的類型值並作為結果返回
   public inline fun <T, R> T.let(block: (T) -> R): R {
      	...
       return block(this)  //呼叫我們傳入的函式，並將結果作為let返回值
   }
   ```

2. `also`：用於執行一個lambda表達式並返回物件本身，跟apply功能一致像，但是採用的是it參數形式傳遞給Lambda目前物件。

   ```kotlin
   //對目前物件進行操作，並返回目前物件本身
   public inline fun <T> T.also(block: (T) -> Unit): T {
       ...
       block(this)   //呼叫我們傳入的函式
       return this   //返回目前T類型物件本身
   }
   ```

3. `run`：用於執行一個lambda表達式並將得到的結果作為返回值返回，它跟let一樣，使用this傳遞目前物件，可以看到接受的參數是一個擴展函式。

   ```kotlin
   public inline fun <T, R> T.run(block: T.() -> R): R {
       ...
       return block()
   }
   ```

由此可見，let和run功能相近，apply和also功能相近，只是它們傳遞物件方式不同，所以說這個就別搞混了。

還有一個比較好用的是，有時候我們可能需要物件滿足某些條件才處理，我們可以使用takeIf來完成：

```kotlin
public inline fun <T> T.takeIf(predicate: (T) -> Boolean): T? {
    ...
    return if (predicate(this)) this else null  //傳入一個用於判斷的函式，根據結果返回物件本身或是null
}

public inline fun <T> T.takeUnless(predicate: (T) -> Boolean): T? {
    ...
    return if (!predicate(this)) this else null  //跟上面相反
}
```

對於takeIf的使用就像下面這樣：

```kotlin
fun main() {
    val str = "Hello World"
  	//判斷字串長度是否大於7，大於就返回一個重複一次的字串，否則原樣返回
    val myStr = str.takeIf { it.length > 7 }?.let { it + it } ?: str
}
```

一個很複雜的工作，可能需要很多行程式碼才能搞定，但是現在借助這些預設的高階擴展函式，我們就可以以更簡短的程式碼完成。

還有一個比較有意思的：

```kotlin
public inline fun <T, R> with(receiver: T, block: T.() -> R): R {
    ...
    return receiver.block()  //手動傳入一個現有的變數，然後透過這個變數去呼叫傳入的Lamdba
}
```

用起來就像這樣：

```kotlin
fun main() {
    val str = "Hello World"
    val len = with(str) { this.length } 
}
```

除了我們上面提到的這些，其實在Standard.kt還提供了更多有意思的工具函式，由於篇幅有限，還請各位小伙伴自行探索。

### 協變與逆變*

**注意：**  這一部分相當有難度，請務必將前面的泛型概念理解到位，否則很難繼續學習。

我們在前面介紹了泛型的基本使用，實際上就是一個待定的類型，我們在使用時可以指定具體的類型，並在編譯時檢查類型是否匹配，保證執行時類型的安全性，就像下面這樣：

```kotlin
class Test<T>(var data: T) 

fun main() {
    val test1: Test<String> = Test("Hello")
    val test2: Test<Int> = Test(10)
}
```

一旦泛型變數類型確定，後續將一直固定使用此類型，並且不相容其他類型：

![image-20231225000422558](https://s2.loli.net/2023/12/25/Zr6owjlEa8ekDAx.png)

但是現在存在這樣一個問題，我們如果使用某個類型的父類呢，會不會出現類型不匹配的情況？

![image-20231225000541465](https://s2.loli.net/2023/12/25/w2H5ychAIOYX9S6.png)

可以看到，即使是Int類型的父類Number，也無法接收其子類類型的結果，這就很奇怪了，我們前面說過一個類可以被當做其父類使用（因為父類具有屬性什麼子類一定也有）會自動完成隱式類型轉換，但是為什麼到了泛型這裡就不行了呢？

為了探究這個問題，我們先從幾個概念開始說起，假設Int類型是Number類型的子類，正常情況下只能子類轉換為父類，泛型類型`Test<T>`存在以下幾種形變：

* 協變 (Covariance)：因為Int是Number的子類，所以`Test<Int>`同樣是`Test<Number>`的子類，可以直接轉換
* 逆變(Contravariance)：跟上面相反，`Test<Number>`可以直接轉換為`Test<Int>`，前置是後者的子類
* 抗變 (Invariant)：`Test<Int>`跟`Test<Number>`沒半點關係，無法互相轉換

而在Kotlin的泛型中，預設就是抗變的，即使兩個類型存在父子關係，到編譯器這裡也不認帳，但是實際上我們需要的可能是協變或是逆變，為了處理這種情況，Kotlin提供了兩個關鍵字供我們使用：

* `out` 關鍵字用於標記一個類型參數作為協變，可以實現子類到父類的轉換。
* `in` 關鍵字用於標記一個類型參數作為逆變，可以實現父類到子類的轉換。

那麼該怎麼使用呢，非常簡單：

```kotlin
fun main() {
    val test1: Test<Int> = Test(888)
  	//使用out關鍵字使得此類型協變，可以代表Number及其子類
    val test2: Test<out Number> = test1  //此時就可以正常接受子類Int了
}
```

雖然看起來非常難理解，但是簡單來說，其實就是為類型添加一個可以轉換子類的性質，`out`作用就是使類型支援協變，可以支援泛型從父類轉換為子類，但是不能子類轉父類，比如這裡使用Any就沒辦法成功接受。相反的，如果我們標記某個類型為`in`，那麼這個類型就是逆變的，可以由父類向下轉化：

```kotlin
fun main() {
    val test1: Test<Any> = Test(888)
  	//使用in關鍵字使得此類型逆變，可以代表Number及其父類
    val test2: Test<in Number> = test1  //Any是Number的父類，逆變
}
```

用樹形圖展示，關係如下：

![image-20231224155321582](https://s2.loli.net/2023/12/24/X7T8Uq5KEkgsASr.png)

![image-20231225004519670](https://s2.loli.net/2023/12/25/ok4fegPIxcFO9Tl.png)

在使用這種協變或逆變類型時，具體使用的類型就變得不確定了，導致不同的界限會有不同的效果，比如下面：

```kotlin
fun main() {
  	//協變類型在使用時會變成上界，因為無論子類是什麼，都是繼承自上界類型的
    val test: Test<out Number> = Test(888)
    var data: Number = test.data
}
```

```kotlin
fun main() {
  	//逆變類型在使用時由於沒有上界，具體使用哪個父類也不清楚，所以只能是Any?類型了
    val test: Test<in Number> = Test(888)
    var data: Any? = test.data
}
```

在使用`out`和`in`之後，類型的使用就可以更加靈活，但是這樣會存在一定的安全隱患，比如下面的程式碼：

```kotlin
open class A
class B: A()
class C: A()

fun main() {
    val test1: Test<B> = Test(B())  //這裡存放的都是B類型的資料
    val test2: Test<out A> = test1  //此時test2與test1是同一個物件，但是test2是out A
    test2.data = C()  //由於C是A的子類，按照正常情況來說可以直接用（但實際上這句會報錯）
  	val data: B = test1.data  //這下搞笑了，拿到的類型應該是C，結果接收的類型是B
}
```

為了解決這種情況，Kotlin對於out或in的類型進行了限制，比如設定了out的情況下：

![image-20231225020935723](https://s2.loli.net/2023/12/25/U7IjSuzdDLMGBHs.png)

屬性的setter操作被限制，無法透過編譯，因為這可能會導致不安全的操作發生，而in也是同理的：

```kotlin
fun main() {
    val test1: Test<A> = Test(B())  //這裡存的是B類型的物件
    val test2: Test<in C> = test1   //直接使用in C接收得到
    val data: C = test2.data   //此時得到的結果應該也可以是C才對，那肯定是錯的
}
```

因此，在使用`in`時，屬性的getter操作被限制，會提示類型不匹配，得到的類型也是Any? 無法透過編譯，同樣是因為可能存在不安全的操作。不僅僅是屬性，包括所有函式的參數、返回值，都會受到限制：

```kotlin
fun main() {
    val test1: Test<B> = Test(B())
    val test2: Test<out A> = test1
    test2.test(C())  //報錯，因為這裡存在消費行為
}
```

因此，對於in和out來說，協變和逆變的屬性將其限制為了生產者和消費者：

* 使用`out`修飾的泛型不能用作函式的參數，對應類型的成員變數setter也會被限制，只能當做一個生產者使用。
* 使用`in`修飾的泛型不能用作函式的返回值，對應類型的成員變數getter也會被限制，只能當做一個消費者使用。

在了解了這麼多泛型的知識之後，相信各位小伙伴已經感受到泛型的巧妙而又複雜的設計了。

最後，在有些時候，我們可能並不在乎到底使用哪一個類型，我們希望一個變數可以接受任意類型的結果，而不是去定義某一個特定的上界或下界。在Kotlin泛型中，星號（`*`）代表了一種特殊的類型投影，可以代表任意類型：

```kotlin
fun main() {
    var test: Test<*> = Test(888)  //由於此時使用了*表示任意類型，無論類型如何變化，都可以被此變數接收
    test = Test("Hello")
}
```

同樣的，由於不確定具體類型，使用時只能是Any?類型，跟上面in的情況一樣，這裡就不做示範了，下一章我們還會繼續探討更多`*`的預設情況。

### 泛型界限*

**注意：**  這一部分相當有難度，請務必將前面的泛型概念理解到位，否則很難繼續學習。

前面我們介紹了協變和逆變，使得泛型的類型可以靈活變化使用，而我們在定義類的時候，在類型參數位置也可以進行限制。

比如有一個新的需求，現在沒有String類型的成績了，但是成績依然可能是整數，也可能是小數，這時我們不希望使用者將泛型指定為除數字類型外的其他類型，這又該怎麼去實現呢？

```kotlin
//設定類型參數上界，必須是Number或是Number的子類
class Score<T : Number>(private val name: String, private val id: String, val value: T)
```

使用類似於繼承的語法來完成類型的上界限制，定義後，使用時的具體類型只能是我們指定的上界類型或是上界類型的子類，不得是其他類型，否則一律報錯：

![image-20231225010418319](https://s2.loli.net/2023/12/25/Hm81fOVTp5XcR24.png)

在預設情況下，如果我們不指定，那麼上界類型就是Any?，而現在，我們在使用時就只能將類型指定為Number的子類了。

如果我們需要設定多個上界，比如必須同時是某兩個類型的子類（或介面實現）像這樣多個約束設定，我們需要使用`where`關鍵字：

```kotlin
class Score<T>(private val name: String, private val id: String, val value: T)
        where T : Comparable<T>, T : Number
				//where後跟上多個需要同時匹配的類型

fun main() {
  	//由於Int同時實現了Comparable介面以及繼承自Number，所以滿足多個條件，可以使用
    var score: Score<Int> = Score("資料結構與演算法", "EP710214", 6)
}
```

透過設定上界，能夠更加規範類的使用。

有時候為了方便，我們也可以直接在類定義的時候直接將類型參數指定為`out`或是`in`來使得其協變或逆變：

```kotlin
interface Test<out T> {
    fun test(): T   //使用T類型作為返回值
}

interface Test<in T> {
    fun test(t: T)  //使用T類型作為參數
}
```

這樣我們使用時就可以實現類型自動適應：

```kotlin
interface Test<out T> {
    fun test(): T
}

fun test(test: Test<Int>) {
    val a: Test<Number> = test  //協變
}
```

同樣的，我們前面說了在添加`in`或`out`後會限制相應的行為來保證類型的安全性，在定義類的一些函式或屬性的時候都會得到警告：

![image-20231225022706721](https://s2.loli.net/2023/12/25/yGZNjz59bq81LW2.png)

在了解了類型界限相關內容之後，我們再來看看`*`類型投影在不同情況下的預設類型，比如：

* 對於`Foo<out T : TUpper>`，其中`T`是與上界`TUpper`的協變類型參數，`Foo<*>`等價於`Foo<out TUpper>`，就像下面這樣：

  ```kotlin
  class Test<out T : Number>(val data: T)  //因為限制了out，因此作為生產者，這裡只能使用val
  
  fun main() {
      val test: Test<*> = Test(10)  //雖然使用了*表示不確定，但是由於類型參數本身存在上界
      var data: Number = test.data  //所以類型讀取後可以直接當做上界類型Number使用
  }
  ```

* 對於`Foo<in T>`，其中`T`是逆變類型參數，`Foo<*>`等價於`Foo<in Nothing>`，無法安全地將屬性給到消費者消費：

  ```kotlin
  class Test<in T> {
      fun set(t: T) { }   //因為限制了in，因此只能作為消費者，這裡用函式的形式
  }
  
  fun main() {
      val test: Test<*> = Test<Int>()
      test.set(10)   //編譯錯誤，set中參數類型為Nothing，不允許任何值
  }
  ```

* 對於`Foo<T : TUpper>`，其中`T`是具有上界`TUpper`的抗變類型參數，在讀取資料時`Foo<*>`等價於`Foo<out TUpper>`，寫入資料時等價於`Foo<in Nothing>`，就像這樣：

  ```kotlin
  class Test<T: Number>(var data: T)
  
  fun main() {
      val test: Test<*> = Test(10)
      var data: Number = test.data  //正常透過
      test.data = 10   //編譯錯誤，Setter for 'data' is removed by type projection
  }
  ```

如果一個泛型類有多個類型參數，每個類型參數都可以獨立使用*表示不確定，例如類型為`interface Function<in T, out U>`，您可以使用以下星形投影：

- `Function<*, String>`等價於`Function<in Nothing, String>`。
- `Function<Int, *>`等價於`Function<Int, out Any?>`。
- `Function<*, *>`等價於`Function<in Nothing, out Any?>`。

泛型的使用可以很簡單也可以很複雜，想要完全把這個搞明白還是需要多練多理解才能達到。

### 類型擦除*

**注意：**  這一部分相當有難度，請務必將前面的泛型概念理解到位，否則很難繼續學習。

前面我們介紹了泛型的使用，以及各種進階功能，但是實際上，泛型的類型檢查僅僅只存在於編譯階段，在原始碼編譯之後，實際上並不會保留任何關於泛型類型的內容，這便是類型擦除。

比如下面的類型：

```kotlin
class Test<T>(private var data: T) {
    fun test(t: T) : T {
        val tmp = data
        data = t
        return tmp
    }
}
```

在編譯時候，會自動擦除類型：

```kotlin
class Test(private var data: Any?) {  //最後還是全部變成Any?類型了
    fun test(t: Any?) : Any? {
        val tmp = data
        data = t
        return tmp
    }
}
```

如果存在上界，那麼擦除後會是上界的類型：

```kotlin
class Test<T : Number>(private var data: T) 
```

```kotlin
class Test(private var data: Number)   //擦除後類型變成上界類型
```

由於在執行時不存在泛型的概念，因此，很多操作都是不允許的，比如類型判斷：

```kotlin
class Test<T>(private var data: T) {
    fun isType(obj: Any) : Boolean {
        return obj is T   //編譯錯誤，由於類型擦除，執行時根本不存在T的類型
    }
}
```

包括我們在使用這個泛型類時：

```kotlin
fun main() {
    val test: Test<Int> = Test(10)
    println(test is Test<Double>)   //編譯錯誤，由於類型擦除，無法判斷具體的類型
  	println(test is Test)  //編譯通過，判斷是不是這個類還是沒問題的
}
```

因此，正是為了保證類型擦除之後程式能夠安全執行，才有了上面這麼多限制。

對於行內函式，泛型擦除的處理會有一些不同，得益於它的行內性質，行內函式的程式碼是在編譯時期直接插入到呼叫處的，在編譯之後具體類型必須要存在，否則會出現問題（因為類型可以明確）因此其泛型參數的具體類型資訊是可用的，編譯器可以使用這些資訊來生成更具體的位元組碼。這意味著，對於行內函式的泛型參數，並不會像非行內函式那樣發生類型擦除。

```kotlin
inline fun <T> test(value: T): T {
    val value2 : T = value
    return value2
}

fun main() {
    val data: String = test("Hello World!")
}
```

行內函式編譯後，類型直接保留：

```kotlin
fun main() {
    val value: String = "Hello World!"
    val value2: String = value   //直接以String類型變數編譯到程式中
    val data: String = value2
}
```

Kotlin的行內函式還有一個功能是可以使用具化的類型參數（`reified` 關鍵字）具化類型參數允許在函式體內部檢測泛型類型，因為這些類型資訊會被編譯器內嵌在呼叫點。但是，這只適用於行內函式，因為類型資訊在編譯時是可知的，並且實際類型會被編譯到使用它們的地方，使用也很簡單：

```kotlin
//添加reified關鍵字具化類型參數
inline fun <reified T> isType(value: Any): Boolean {
    return value is T  //這樣就可以在函式裡面使用這個類型了
}

fun main() {
    println(isType<String>("666"))
}
```

具化類型參數僅適用於行內函式。

## 陣列

前面我們介紹了泛型，它可以實現在編寫程式碼階段的類型檢查，現在我們就可以正式進入到陣列的學習當中了。

假設出現一種情況，我們想記錄100個數字，要是採用定義100個變數的方式可以嗎？是不是有點太累了？這種情況我們就可以使用陣列來存放一組相同類型的資料。

![image-20220922214604430](https://s2.loli.net/2023/12/25/VazkfM2FYGicIlq.png)

在Kotlin中，陣列是Array類型的物件。

### 建立陣列

陣列是相同類型資料的有序集合，陣列可以代表任何相同類型的一組內容，其中存放的每一個資料稱為陣列的一個元素，我們來看看如何建立一個陣列，在Kotlin中有兩種建立方式：

- 官方預設工具函式，如[`arrayOf()`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/array-of.html)、[`arrayOfNulls()`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/array-of-nulls.html#kotlin$arrayOfNulls(kotlin.Int))以及[`emptyArray()`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/empty-array.html)
- 使用類`Array`建構子建立。

比如我們要建立一個包含5個數字的陣列，那麼我們可以像這樣：

```kotlin
val array: Array<Int> = arrayOf(7, 3, 9, 1, 6)  //直接在arrayOf函式中添加每一個元素
```

這裡得到的結果類型為Array，它是一個泛型類

```kotlin
public class Array<T> {
    //建構子，包括陣列大小、元素初始化函式
    public inline constructor(size: Int, init: (Int) -> T)

    //重載[]運算符
    public operator fun get(index: Int): T
    public operator fun set(index: Int, value: T): Unit

    //目前陣列大小（可以看到是val類型的，一旦確定不可修改）
    public val size: Int

    //疊代運算重載（後面講解）
    public operator fun iterator(): Iterator<T>
}
```

可以看到，陣列本質就是一個Array類型的物件，其類型參數就是我們儲存的元素類型，由於使用建構子建立陣列稍微有些複雜，我們將其放到後面進行介紹。

**注意：**  陣列在建立完成之後，陣列容量和元素類型是固定不變的，後續無法進行修改。

```kotlin
fun main() {
    val array: Array<Int> = arrayOf(7, 3, 9, 1, 6)
    array.size = 10   //編譯錯誤，長度不可修改
    val arr: Array<String> = array  //編譯錯誤，類型不匹配
}
```

既然現在建立好了陣列，那麼該如何去訪問陣列裡面的內容呢？

```kotlin
fun main() {
    val array: Array<Int> = arrayOf(7, 3, 9, 1, 6)
    println(array[0])   //使用[]運算符來訪問指定下標上的元素
}
```

由於陣列存放的是一組元素，我們在訪問每個元素時需要告訴程式我們要訪問的是哪一個，而每個元素都有一個自己的下標地址，下標從0開始從左往右依次遞增排列，比如我們要訪問第一個元素那麼下標就是0，第三個元素下標就是2，以此類推：

```kotlin
fun main() {
    val array: Array<Int> = arrayOf(7, 3, 9, 1, 6)
    println("陣列中的第二個元素是${array[1]}")
}
```

注意，在使用陣列時，我們只能訪問陣列可以訪問的範圍，如果我們獲取一個範圍之外的元素，會得到錯誤，比如目前的陣列的大小是5那麼也就只能包含5個元素，此時我們去訪問第六個元素，顯然是錯誤的：

```kotlin
println("陣列中的第六個元素是${array[5]}")  //已經超出可訪問範圍了
println("陣列中的第?個元素是${array[-1]}")  //下標從0開始，怎麼可能有-1呢
```

![image-20231225172109843](https://s2.loli.net/2023/12/25/v4w8mdaSDZM51t6.png)

我們也可以使用`[]`修改陣列中指定下標元素的值：

```kotlin
fun main() {
    val array: Array<Int> = arrayOf(7, 3, 9, 1, 6)
    array[0] = 10  //修改第一個元素的值
    println("陣列中的第一個元素是${array[0]}")
}
```

還有一個要注意的是，我們直接列印這個陣列物件並不能得到陣列裡面每個元素的值，而是一堆看不懂的東西：

![image-20231225172707649](https://s2.loli.net/2023/12/25/Ka586xf3vjkrNo4.png)

具體原因可以透過學習Java後進行了解，如果各位小伙伴需要列印陣列中的每一個元素，我們只能一個一個列印，可以使用一個for循環語句來完成：

```kotlin
fun main() {
    val array: Array<Int> = arrayOf(7, 3, 9, 1, 6)
    for (i in 0..<array.size) {   //從0循環到array.size前一位
        println(array[i])   //每一個依次列印即可
    }
}
```

不過，在Kotlin中，這樣編寫並不優雅，我們有更好的方式去遍歷陣列中的每一個元素，在之前我們學習for循環語句時，談到使用in來遍歷一個可遍歷的目標，而陣列就是滿足這個條件的，我們可以直接遍歷它：

```kotlin
fun main() {
    val array: Array<Int> = arrayOf(7, 3, 9, 1, 6)
    for (element in array) {
        println(element)   //從第一個元素開始依次遍歷，element就是每一個元素了
    }
}
```

當然，如果我們還是希望按照陣列的索引進行遍歷，也可以使用：

```kotlin
val array: Array<Int> = arrayOf(7, 3, 9, 1, 6)
for (i in array.indices) {   //indices返回的是陣列的有效索引範圍，這裡就是0 ~ 4
    println(array[i])
}
```

如果你想同時遍歷索引和元素本身，也可以使用withIndex函式，它會生成一系列IndexedValue物件：

```kotlin
//關於data class我們會在下一篇中講解
public data class IndexedValue<out T>(public val index: Int, public val value: T) //包含元素本身和索引
```

在使用forin時，我們也可以對待遍歷的元素進行結構操作，當然，前提是這些物件類型支援解構，比如這裡的IndexedValue就支援解構，所以我們可以在遍歷時直接使用解構之後的變數進行操作：

```kotlin
val array: Array<Int> = arrayOf(7, 3, 9, 1, 6)
for ((index, item) in array.withIndex()) {  //使用withIndex解構後可以同時遍歷索引和元素
    println("元素$item，位置: $index")
}
```

如果需要使用Lambda表達式快速處理裡面的每一個元素，也可以使用`forEach`高階函式：

```kotlin
val array: Array<Int> = arrayOf(7, 3, 9, 1, 6)
array.forEach { println(it) }   //只帶元素的
array.forEachIndexed { index, item ->   //同時帶索引和元素的
    println("元素$item，位置: $index")
}
```

如果只是想列印陣列裡面的內容，快速查看，我們可以使用：

```kotlin
val array: Array<Int> = arrayOf(7, 3, 9, 1, 6)
println(array.joinToString())  //使用joinToString將陣列中的元素轉換為字串，預設使用逗號隔開：7, 3, 9, 1, 6
println(array.joinToString(" - ", "> ", " <"))  //自訂分隔符號，前後綴: > 7 - 3 - 9 - 1 - 6 <
println(array.joinToString(limit = 1, truncated = "..."))  //甚至可以限制數量，多餘的用自訂的字串...代替: 7, ...
println(array.joinToString() { (it * it).toString() })   //自訂每一個元素轉換為字串的結果
```

我們接著來看一下如何使用建構子來建立陣列，首先建構子時這樣定義的：

```kotlin
/**
 * size: 不必多說，陣列的大小
 * init: 初始化操作，這個操作會根據陣列大小，循環呼叫傳入的函式size次，並且將對應的下標作為參數，我們需要在函式中返回目前陣列元素類型的結果，這樣就會自動填充到陣列的對應位置上
 */
public inline constructor(size: Int, init: (Int) -> T)
```

比如我們希望建立一個字串陣列：

```kotlin
fun main() {
    val array: Array<String> = Array(5) { "我是元素$it" }   //其中返回值為自訂的字串，這樣就會自動填充到對應位置
    for (s in array) {
        println(s)
    }
}
```

![image-20231225174845632](https://s2.loli.net/2023/12/25/c9mWKr7PgM1Uwkl.png)

利用這種特性，我們可以快速建立一個全是同一個值的陣列：

```kotlin
val array: Array<Double> = Array(5) { 1.5 }  // 1.5, 1.5, 1.5, 1.5 ...
```

還可以快速搞一個平方數陣列：

```kotlin
val array: Array<Int> = Array(10) { it * it }   // 0, 1, 4, 9, 16 ...
```

不過，其實一般情況下使用`arrayOf`都可以解決大部分情況了，還有它的變種，大概介紹一下：

```kotlin
val array: Array<Int> = emptyArray<Int>()   //建立容量為0的陣列
val array: Array<Int?> = arrayOfNulls(10)   //建立元素可空的陣列
```

下一節課我們接著學習更多陣列的操作。

### 使用陣列

現在我們已經學習了如何建立陣列，實際上官方庫提供了很多陣列的擴展函式，方便我們對於陣列的使用，我們現在就來看看吧。

對於兩個陣列來說，如果我們要比較它們之間是否包含相同的內容，需要使用特殊的比較函式：

```kotlin
fun main() {
    val array1: Array<Int> = arrayOf(1, 2, 3, 4, 5)  //兩個內容相同的陣列
    val array2: Array<Int> = arrayOf(1, 2, 3, 4, 5)
    println(array1 == array2)   //不可以使用==來判斷陣列內容是否相同，不支援
    println(array1.contentEquals(array2))   //需要使用擴展函式contentEquals來進行內容比較
}
```

要複製一個陣列的內容並生成一個新的陣列，可以：

```kotlin
fun main() {
    val array1: Array<Int> = arrayOf(1, 2, 3, 4, 5)
    val array2: Array<Int> = array1.copyOf()   //使用copyOf來複製資料內容並建立一個新的陣列儲存
    println(array2 === array1)  //false，不是同一個物件
}
```

copyOf函式可以指定複製的長度或是複製的範圍，使用更加靈活一些：

```kotlin
val array2: Array<Int?> = array1.copyOf(10)
//在複製時指定要複製的長度，如果小於陣列長度則只保留前面一部分內容，如果大於則在末尾填充null，因此返回的類型是Int?可空
```

```kotlin
val array2: Array<Int> = array1.copyOfRange(1, 3)  //從第二個元素開始複製到第四個元素前為止，共2個元素
//使用copyOfRange複製指定下標範圍上的元素
```

還有一個比較類似操作，但是可以使用Range進行分割：

```kotlin
val array1 = arrayOf(1, 2, 3, 4, 5)
val array2 = array1.sliceArray(1..3)   //從第二個元素到第四個元素共三個元素的陣列
```

兩個陣列也可以直接拼接到一起，形成一個長度為10的新陣列，按順序拼接：

```kotlin
val array1 = arrayOf(1, 2, 3, 4, 5)
val array2 = arrayOf(6, 7, 8, 9, 10)
val array3 = array1 + array2
```

快速尋找元素肯定也是不在話下的：

```kotlin
val array = arrayOf(13, 16, 27, 32, 38)
println(array.contains(13))   //判斷陣列中是否包含3這個元素
println(array in 13)   //跟contains函式效果一樣，判斷陣列中是否包含3這個元素
println(array.indexOf(26))    //尋找指定元素的下標位置
println(array.binarySearch(16))    //二分搜尋某個元素的下標位置（效率屌打上面那個函式，但是需要陣列元素有序，具體原因可以學習資料結構與演算法了解）
```

不過，可能會有小伙伴好奇，這裡的`contains`函式傳入的物件，是如何進行判斷的？比如我要刪除某一個元素，程式是如何將陣列內的物件與傳入的物件進行比較得出是相同的元素呢？我們來看下面這個例子：

```kotlin
class Student(val name: String, val age: Int)

fun main() {
    val array = arrayOf(Student("小明", 18), Student("小紅", 17))
    println(array.contains(Student("小明", 18)))   //結果為false
}
```

怎麼回事？我們這明明傳入的是兩個內容一樣的物件啊，為什麼是false呢？直接看原始碼：

```kotlin
public operator fun <@kotlin.internal.OnlyInputTypes T> Array<out T>.contains(element: T): Boolean {
    return indexOf(element) >= 0  //呼叫內部indexOf函式看看能不能找到這個元素的下標
}

public fun <@kotlin.internal.OnlyInputTypes T> Array<out T>.indexOf(element: T): Int {
    if (element == null) {
       ...
    } else {
        for (index in indices) {   //直接透過遍歷的形式對陣列內的元素一個一個進行判斷
            if (element == this[index]) {   //可以看到，這裡判斷使用的是==運算符，這下就好說了
                return index
            }
        }
    }
    return -1
}
```

我們在前面介紹過，使用==的判斷實際上取決於equals函式的重寫，如果要讓兩個物件實現我們自訂的判斷，需要重寫對應類型的equals函式，否則無法實現自訂比較，預設情況下判斷的是兩個物件是否為同一個物件，所以，我們可以嘗試重寫一下：

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

現在得到的結果就是我們希望的樣子了。

也可以快速判斷和獲取元素：

```kotlin
val array = arrayOf(1, 2, 3, 4, 5)
println(array.any())   //判斷陣列是否為空陣列（容量為0）
println(array.first())   //快速獲取首個元素
println(array.last())    //快速獲取最後一個元素
```

我們也可以快速將一個陣列的內容進行倒序排放：

```kotlin
val array1: Array<Int> = arrayOf(1, 2, 3, 4, 5)
val array2: Array<Int> = array1.reversedArray()   //翻轉陣列元素順序，並生成新的陣列
```

```kotlin
val array1: Array<Int> = arrayOf(1, 2, 3, 4, 5)
array1.reverse()   //直接在原陣列上進行元素順序翻轉
array1.reverse(1, 3)   //僅翻轉指定下標範圍內的元素
```

如果我們想要直接將陣列中元素打亂，也有一個快速洗牌的函式將所有元素順序重新隨機分配：

```kotlin
val array1: Array<Int> = arrayOf(1, 2, 3, 4, 5)
array1.shuffle()  //使用shuffle函式將陣列中元素順序打亂
```

打亂了想重新還原成有序的陣列怎麼辦？

```kotlin
array1.sort()   //使用sort函式對陣列中元素進行排序，排序規則可以自訂
array1.sort(1, 3)   //僅排序指定下標範圍內的元素
array1.sortDescending()   //按相反順序排序
```

注意，排序操作並不是任何類型上來就支援的，由於這裡我們使用的是基本類型Int，它預設實現了Comparable介面，這個介面用於告訴程式我們的排序規則，所以，如果陣列中的元素是未實現Comparable介面的類型，那麼無法支援排序操作。

我們可以來嘗試實現一下：

```kotlin
//首先類型需要實現Comparable介面，泛型參數T填寫為目前類型
class Student(private val name: String, private val age: Int) : Comparable<Student> {
  	//介面中就這樣一個函式需要實現，這個是比較的核心演算法，要參數是另一個需要比較的元素，然後返回值是一個Int
  	//使用目前物件this和給定物件other進行比較，如果返回小於0的數，說明目前物件應該排在前面，反之排後面，返回0表示同樣的級別
    override fun compareTo(other: Student): Int = this.age - other.age
    override fun toString(): String = "$name ($age)"
}
```

這樣，我們自訂的類型就支援比較和排序了：

```kotlin
val array1 = arrayOf(Student("小明", 18), Student("小紅", 17))
array1.sort()
```

還有可以快速填充陣列內容的函式：

```kotlin
val array1 = arrayOf(1, 2, 3, 4, 5)
array1.fill(10)   //重新將陣列內部元素全部填充為10
```

好了，就先介紹這麼多吧，到這裡也才介紹了陣列操作的一半，後面到了集合類我們再來介紹更多使用的擴展函式，因為集合陣列都是支援的。

### 可變長參數

前面我們介紹了陣列的使用，不知道各位小伙伴有沒有疑惑，在使用arrayOf時，裡面的參數為什麼可以隨意填寫不同數量？

```kotlin
arrayOf(1, 2, 3, 4, 5)
arrayOf(1, 2, 3)
arrayOf(1, 2, 3, 4, 5, 6, 7, 8, 9)
```

函式的參數數量不是固定的嗎？怎麼還能動態加？難道我們前面學的是假的函式？這其實是因為這個函式使用了可變長參數的原因，它可以實現同一個類型的參數任意填寫：

```kotlin
fun test(vararg strings: String) {
	//使用vararg關鍵字將參數標記為可變長參數
}

fun main() {
    test("AAA", "BBB", "CCC")   //在使用時，只要是同類型的參數可以填寫任意數量
}
```

但是需要注意的事，可變長參數在函式的形參列表裡面只能存在一個，下面這幾種情況：

```kotlin
fun test(vararg strings: String, a: Int) { ... }   //編譯透過
fun test(a: Int, vararg strings: String) { ... }   //編譯透過
fun test(vararg a: Int, vararg strings: String) { ... }    //編譯錯誤，存在多個可變長參數
```

那麼，這種可變長參數在函式中如何使用呢？我們可以將其當做一個Array來使用：

```kotlin
fun test(vararg strings: String) {
    var str: Array<out String> = strings  //在函式中得到的是一個Array<out String>類型的陣列
}
```

這樣一看就簡單多了，可變長參數本質就是一個陣列。

那麼既然可變長參數是一個陣列，我們可不可以直接把陣列作為參數給到一個可變長參數中呢？

```kotlin
fun main() {
    val array = arrayOf("AAA", "BBB", "CCC")
    test(array)   //編譯錯誤，這裡需要的是多個String，但是傳入的類型是Array<String>
}
```

這就有點不太合理了，反正都是陣列為什麼我不能直接傳個陣列進去當做實參呢，因此Kotlin給我們提供了一個*擴展*運算符（`*`）此運算符將陣列的每個元素作為單個參數傳遞：

```kotlin
fun main() {
    val array = arrayOf("AAA", "BBB", "CCC")
    test(*array)   //編譯通過，雖然看起來有點像C語言的指標
}
```

別急，你以為這樣就結束了嗎，它還可以混著用：

```kotlin
val array = arrayOf("AAA", "BBB", "CCC")
test("111", *array, "DDD", "EEE")   //前面後面甚至還能繼續寫
```

因此，如果我們需要將一個陣列的內容複製到一個新的陣列中，直接這樣操作就好了：

```kotlin
val array = arrayOf("AAA", "BBB", "CCC")
val array2 = arrayOf(*array)
```

### 原生類型陣列

在之前，我們使用了大量基本類型陣列，比如`Array<Int>`、`Array<Double>`、`Array<Char>`等等，這些包含基本類型的陣列往往在編譯時可以得到最佳化（比如JVM平台會直接編譯為基本類型陣列，如`int[]`、`double[]`等，可以免去裝箱拆箱開銷）Kotlin提供了預設的原生類型陣列：

| 原生類型陣列                                                 | 相當於Java  |
| ------------------------------------------------------------ | ----------- |
| [`BooleanArray`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-boolean-array/) | `boolean[]` |
| [`ByteArray`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-byte-array/) | `byte[]`    |
| [`CharArray`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-char-array/) | `char[]`    |
| [`DoubleArray`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-double-array/) | `double[]`  |
| [`FloatArray`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-float-array/) | `float[]`   |
| [`IntArray`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-int-array/) | `int[]`     |
| [`LongArray`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-long-array/) | `long[]`    |
| [`ShortArray`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-short-array/) | `short[]`   |

這些類型與Array類型沒有任何繼承關係，但是它們有同樣的方法屬性集，使用起來區別不大，優先使用基本類型陣列，可以使得程式免得到一定最佳化，增加效率：

```kotlin
fun main() {
  	//使用arrayOf的變種intArrayOf快速生成IntArray
    val array: IntArray = intArrayOf(7, 3, 9, 1, 6)
    array.forEach { println(it) }
}
```

這些原生類型陣列也有一些額外的擴展，比如快速求和：

```kotlin
val array: IntArray = intArrayOf(7, 3, 9, 1, 6)
println(array.sum())  //快速求和操作，獲得陣列中所有元素之和
```

還有求平均值之類的：

```kotlin
val array: IntArray = intArrayOf(7, 3, 9, 1, 6)
println(array.average())   //求整個陣列的平均數
```

快速獲取最大值和最小值：

```kotlin
val array: IntArray = intArrayOf(7, 3, 9, 1, 6)
println(array.min())
println(array.max())
```

其他使用基本一致，這裡就不多進行介紹了。

### 嵌套陣列

有些時候，單個維度的陣列似乎無法滿足我們的需求。比如我們現在6個元素為一組儲存，現在共需要儲存4組這樣的資料，我們不可能去定義4個一樣的陣列吧？這個時候就需要用到嵌套陣列了。

存放陣列的陣列，相當於將維度進行了提升，比如下面的就是一個2x10的陣列：

![image-20220922221557130](https://s2.loli.net/2023/12/25/XO26TMJpKrf3YUH.png)

二維陣列看起來更像是一個平面，同理，三維陣列就是一個立方體空間，四位陣列就進入到我們人類無法理解的範圍了，由很多個三維組成（物理上解釋或許是時間軸？）

那麼像這樣的多維度陣列如何建立呢？這裡我們以二維陣列為例，三維四維同理：

```kotlin
val arr: Array<IntArray> = arrayOf(intArrayOf(1, 2), intArrayOf(3, 4), intArrayOf(5, 6))
```

可以看到，我們使用arrayOf去囊括多個IntArray，這樣，最外層的Array相當於是儲存多個IntArray的Array，也就實現了我們上面的二維陣列效果了。當然像這樣也是可以的：

```kotlin
//存放9個Array<Int>陣列的陣列，其中每個Array<Int>的長度為4，內容為0填充
// { {0,0,0,0}, {0,0,0,0}, {0,0,0,0} ... }
val arr: Array<Array<Int>> = Array(9) { Array(4) { 0 } }
```

嵌套陣列看起來可能有些繞，但是其實仔細分析之後還是比較簡單的。

我們在使用二維陣列時：

```kotlin
val arr: Array<IntArray> = arrayOf(intArrayOf(1, 2), intArrayOf(3, 4), intArrayOf(5, 6))
val array: IntArray = arr[0]   //獲取二維陣列的第一個元素，得到內層存放的陣列
val item: Int = array[0]   //再從記憶體存放的陣列中拿到第一個元素
```

所以，如果我們要獲取位於整個二維矩陣左上角的第一個元素，可以像這樣：

```kotlin
val arr: Array<IntArray> = arrayOf(intArrayOf(1, 2), intArrayOf(3, 4), intArrayOf(5, 6))
//這裡使用了兩個[]運算符，第一個處理最外層陣列，第二個才是對內層陣列的操作
val item: Int = arr[0][0]
```

對於這種二維陣列，如果需要遍歷，我們同樣可以使用for循環來完成，不過需要兩層for才可以搞定：

```kotlin
val arr: Array<IntArray> = arrayOf(intArrayOf(1, 2), intArrayOf(3, 4), intArrayOf(5, 6))
for (ints in arr) {   //最外層遍歷外層陣列中存放的每一個內層陣列
    for (int in ints) {     //內層循環遍歷每一個內層陣列
        println(int)   //得到每一個內層陣列的值
    }
}
```

由於現在陣列內存放的是陣列，我們在比較兩個嵌套陣列的內容是否相同時，需要使用深度比較：

```kotlin
fun main() {
    val arr1: Array<IntArray> = arrayOf(intArrayOf(1, 2), intArrayOf(3, 4), intArrayOf(5, 6))
    val arr2: Array<IntArray> = arrayOf(intArrayOf(1, 2), intArrayOf(3, 4), intArrayOf(5, 6))
    println(arr1.contentEquals(arr2))   //此函式只會簡單比較裡面的每一個元素，當裡面每個元素是陣列時不會再繼續去比較第二層第三層等
    println(arr1.contentDeepEquals(arr2))  //此函式會一直深入比較每一層，多維使用這個比較
}
```

這裡還有一個知識誤區，雖然我們使用的看起來確實類似於二維陣列，但是每一個陣列的長度並不需要是相同的：

```kotlin
val arr: Array<IntArray> = arrayOf(intArrayOf(1, 3, 4, 5), intArrayOf(2, 9))
//這裡第一個陣列長度為4，第二個為2
```

甚至類型也可以不一樣：

```kotlin
//只要內層使用Any類型，就可以接收所有類型的嵌套陣列
val arr: Array<Array<out Any>> = arrayOf(arrayOf(1, 3, 4, 5), arrayOf("AAA", "BBB"))
```

不過正常情況下，我們還是會按照標準的二維陣列來使用，這樣更加規範一些。

## 集合類

前面我們學習了陣列的使用，雖然陣列可以很方便地儲存一組資料，但是它存在諸多限制：

* 長度是固定的，無法擴展
* 無法做到在陣列中像列表那樣插入或者刪除元素

顯然，在很多情況下，陣列雖然可以儲存一組資料，但是它並不好用，我們需要借助更加強大的集合類來實現更多進階功能。在Kotlin中，預設提供了以下類型的集合：

- **List：**  有序的集合，透過索引訪問元素，可以包含重複元素，比如電話號碼：它就是一組數字，並且順序很重要，而且數字可以重複。
- **Set：**  不包含重複元素的集合，它更像是數學中的集合，一般情況下不維護元素順序，例如，彩券上的數字：都是獨一無二的，並且它們的順序不重要。
- **Map：**  是一組鍵值對，其中每一個鍵不可重複存在，每個鍵都映射到恰好一個值（值可以重複存在）這跟數學上的映射關係很像。它經常用於儲存（員工ID -> 員工具體資訊）這樣的結構。

所有集合類都是繼承自Collection介面（Map除外）我們可以看看這個介面的定義：

```kotlin
public interface Collection<out E> : Iterable<E> {  //繼承了可疊代介面（後面講解）
    //集合的大小
    public val size: Int
    //判斷集合是否為空
    public fun isEmpty(): Boolean
    //集合是否包含某個元素，可用in運算符判斷
    public operator fun contains(element: @UnsafeVariance E): Boolean
  	//生成疊代器（後面講解）
    override fun iterator(): Iterator<E>
  	//是否包含另一個集合中所有的內容
    public fun containsAll(elements: Collection<@UnsafeVariance E>): Boolean
}
```

這個介面定義了集合的基本操作，以及核心屬性，而由集合頂層介面衍生的不同集合類，也都有自己的定義。集合類一般都是以介面類型的變數進行使用，因為不同的集合可能存在不同的集合實現類，為了使用起來更加通用，我們往往會使用集合類的介面進行操作。

下面就讓我們一個一個認識吧。

### List集合

List就像它的名字一樣，就是一個列表，它儲存一組有序的資料，比如我們看到的餐廳選單，還有遊戲的排行榜，每一道菜、每一個玩家都是按順序向下排列的，並且根據情況，我們可以自由地在某個位置插入或刪除一個新的元素，列表的長度也會動態發生變化，List集合就是為了這些功能而生的。

![image-20220723112639416](https://s2.loli.net/2023/12/25/f2BGNhqeV6nHdZp.png)

要建立一個List集合非常簡單，就跟我們之前建立陣列一樣：

```kotlin
fun main() {
    val list: MutableList<String> = mutableListOf(1, 2, 3, 4)   //使用mutableListOf來建立一個可修改的List集合
    list[0] = 10   //修改某個位置上的元素
    println(list[1])   //獲取某個位置上的元素
    println(list)    //列印出來的結果也是非常標準的: [10, 2, 3, 4]
}
```

我們發現，使用List集合之後，很多操作其實跟陣列是基本一樣的，它同樣可以儲存一組元素，以及修改。

除了可以使用陣列支援的操作之外，為了能夠作為列表使用，還有很多新的操作，比如我們希望在末尾添加一個新的元素到列表中：

```kotlin
val list = mutableListOf(1, 2, 3, 4)
list.add(5)   //使用add函式添加一個新的元素到列表末尾
println(list)   //列表自動增長，得到[1, 2, 3, 4, 5]
```

我們可以在整個列表之間的任意位置插入，但是同樣不能出現越界的情況：

![image-20220723153933279](https://s2.loli.net/2023/12/25/bHFivT14Y7Wh8q6.png)

```kotlin
val list = mutableListOf(1, 2, 3, 4)
list.add(2, 666)   //將666插入到第三個元素的位置上去
```

既然可以插入元素，同樣的也可以刪除元素：

```kotlin
val list = mutableListOf("AAA", "BBB", "CCC", "DDD")
list.removeAt(2)  //使用removeAt可以刪除指定位置上的元素
list.remove("DDD")    //使用remove可以刪除指定元素
```

可以看到，列表相比我們傳統的陣列來說，完整地支援了增刪改查這四個操作，使用起來也會更加方便。

當然，有些時候可能我們希望獲取一個唯讀的列表：

```kotlin
val list: List<String> = listOf("AAA", "BBB", "CCC", "DDD")  //使用listOf生成的列表是唯讀的
list[0] = "XXX"   //在修改時會直接提示不支援
```

類似於陣列，還有多種列表建立函式：

```kotlin
val array = arrayOf("AAA", null, "CCC", "DDD")
val list: List<String> = listOfNotNull(*array)   //使用listOfNotNull可以自動去除所有null的元素，再建立唯讀列表
```

```kotlin
val list: List<String> = emptyList()   //返回空列表
```

或是使用建構子來建立一個列表：

```kotlin
val list: List<String> = List(3){ "TZ" }  //跟陣列一樣，不多說了
println(list) 
```

如果我們需要遍歷一個列表，同樣很簡單，跟陣列完全一樣：

```kotlin
val list: List<String> = listOf("AAA", "BBB", "CCC", "DDD")
for (s in list) {  //使用forin來快速遍歷陣列中的每一個元素
    println(s)
}

for ((index, item) in list.withIndex()) {
    println("元素$item, 下標: $index")
}
```

集合也支援加法和減法運算：

```kotlin
fun main() {
    val l1 = listOf("AAA", "DDD", "CCC")
    val l2 = listOf("BBB", "CCC", "EEE")
    println(l1 + l2)   //合併兩個List的內容，順序直接在後面拼接: [AAA, DDD, CCC, BBB, CCC, EEE]
    println(l1 - l2)   //讓前面的集合減去與後面集合存在重複內容的部分: [AAA, DDD]
}
```

使用還是非常簡單的。

### Set集合

Set集合非常特殊，雖然它也可以儲存一組資料，但是它不允許存在重複元素，我們無法讓Set集合中同時存在兩個一樣的元素，這在一些需要去重的場景中非常實用，這跟數學中定義的集合非常相似。

建立一個Set集合很簡單：

```kotlin
fun main() {
  	//使用mutableSetOf來建立一個Set集合
    val set: Set<String> = mutableSetOf("AAA", "BBB", "BBB", "CCC")
    println(set)   //由於不允許出現重複元素，得到 [AAA, BBB, CCC]
}
```

與列表一樣，可以隨意插入元素，元素預設在尾部插入，順序為插入順序：

```kotlin
val set: MutableSet<String> = mutableSetOf("AAA", "DDD", "CCC")
set.add("BBB")
```

不過Set預設不支援在指定位置插入元素，只能尾插，同時我們也不能透過下標去訪問Set中的元素，這是因為Set底層採用的並不是線性資料結構儲存，而是用了雜湊表或是樹形結構（感興趣的小伙伴可以看一下另一期資料結構與演算法篇教學）而內部元素的順序則是採用的其他形式進行維護的。

不過，我們到是可以借助疊代器來獲取目前順序上的第N個元素：

```kotlin
val set = linkedSetOf("AAA", "DDD", "CCC")
println(set.elementAt(1))   //elementAt是透過疊代器的遍歷順序取得對應位置的元素
```

有關疊代器的知識，我們放在後面進行講解。

同時，由於Set更接近於數學上的集合概念，Kotlin為我們準備了很多集合之間的操作：

```kotlin
val set1 = mutableSetOf("AAA", "DDD", "CCC")
val set2 = mutableSetOf("BBB", "CCC", "EEE")
println(set1 union set2)   //求兩個集合的併集: [AAA, DDD, CCC, BBB, EEE]  Set的+運算與這個效果一樣
println(set1 intersect set2)   //求兩個集合的交集: [CCC]
println(set1 subtract set2)  //求集合1在集合2中的的差集: [AAA, DDD]  Set的-運算與這個效果一樣
println((set1 - set2) union (set2 - set1))   //併集減去交集
```

![image-20231226003204157](https://s2.loli.net/2023/12/26/o4kFTPj6MhmGbVl.png)

雖然集合相關操作也可以應用於List集合，但是計算得到的結果始終是Set集合：

```kotlin
fun main() {
    val l1 = listOf("AAA", "DDD", "CCC")
    val l2 = listOf("BBB", "CCC", "EEE")
    val set: Set<String> = l1 union l2   //得到的結果是一個Set集合
    println(set)
}
```

對於Set集合，官方也有很多預設的函式用於建立：

```kotlin
val set = hashSetOf("AAA", "DDD", "BBB")   //創一個不重複且無序的Set集合
println(set)   //遍歷順序並不是添加順序: [AAA, BBB, DDD]
```

```kotlin
val set = linkedSetOf("AAA", "DDD", "BBB")  //跟mutableSetOf一樣得到一個不重複且有序的Set集合
println(set)
```

```kotlin
val set1 = setOf("AAA", "DDD", "BBB")   //唯讀的Set集合
val set2 = setOfNotNull("AAA", "DDD", "BBB", null)   //自動過濾Null元素的Set集合
```

```kotlin
val set = sortedSetOf("AAA", "DDD", "BBB")   //元素自動排序的Set集合，可以自訂排序規則
```

```kotlin
val hashSet = HashSet<String>()  //創一個不重複且無序的Set集合
val linkedHashSet = LinkedHashSet<String>()   //跟mutableSetOf一樣得到一個不重複且有序的Set集合 
```

最後我們來講解一個前面就買下伏筆的問題，這裡我們建立了一個Student類型的Set集合：

```kotlin
class Student(private val name: String, private val age: Int) {
    override fun toString(): String = "$name ($age)"
}

fun main() {
    val set = mutableSetOf(Student("小明", 18))
    set.add(Student("小明", 18))
    println(set)
}
```

雖然我們插入了兩個相同的資料，但是它們本質上是兩個物件，只是內容相同，所以，Set中會認為它們不同，同時得到儲存：

![image-20231226150034169](https://s2.loli.net/2023/12/26/xUAu26YMmlJgvsd.png)

為了解決這種問題，我們之前採用的是重寫`equals`函式來重新定義比較規則，這樣就可以實現內容相同判斷為同一個了：

```kotlin
class Student(private val name: String, private val age: Int) {
    override fun toString(): String = "$name ($age)"
    override fun equals(other: Any?): Boolean {   //跟之前一樣，添加自訂的比較方式
        if(this === other) return true
        if(other !is Student) return false
        if(name != other.name) return false
        if(age != other.age) return false
        return true
    }
}
```

再次處理程序，我們發現似乎沒有什麼用：

![image-20231226150034169](https://s2.loli.net/2023/12/26/xUAu26YMmlJgvsd.png)

什麼鬼，這明明都把比較規則給自訂了，怎麼還是不能判斷為同一個呢？我們之前難道學的是個假的嗎？我們注意到類上有一個警告，提示我們沒有重寫了eq函式但是沒有定義hashCode：

![image-20231226150455150](https://s2.loli.net/2023/12/26/N5mXoR9UZLKkMD1.png)

這個hashCode是什麼鬼？實際上Set集合預設採用的是雜湊表進行資料儲存（詳情請看資料結構與演算法篇影片教學）而雜湊表在儲存資料時，需要透過一個雜湊函式計算出物件的雜湊值，如果兩個物件的雜湊值相同，那麼在雜湊表中就會認定為是同一個元素，如果不相同，那麼會認定為不同的兩個元素，因此，這裡我們僅僅重寫equals只能滿足部分集合類的使用，而到了Set這裡包括後面的Map就開始不行了。

我們可以看到，在Any類中確實定義了一個hashCode函式，這個就是用於計算物件的雜湊值的：

```kotlin
/**
 * 計算並返回物件的雜湊值，雜湊函式的計算結果需要滿足以下標準:
 *
 * * 標準1: 對同一個物件呼叫此函式時，應該始終返回同一個雜湊值，除非重寫過類的equals函式，修改過比較方式
 * * 標準2: 如果兩個物件使用equals函式判斷的結果為相同，那麼它們計算得到的雜湊值也應該相同
 */
public open fun hashCode(): Int
```

在預設情況下，物件的雜湊值得到的結果是物件在記憶體中存放的地址，以Int類型表示：

```kotlin
println(Any().hashCode())   //結果為記憶體地址位置: 295530567
```

因此，上面兩個物件由於存放在不同的地址，所以得到的雜湊值肯定是不一樣的，既然現在我們僅僅只是比較物件的名稱和年齡是否相同，我們可以修改一下雜湊函式的計算規則：

```kotlin
class Student(private val name: String, private val age: Int) {
    ...

    override fun hashCode(): Int {
        var result = name.hashCode()  //僅計算name和age屬性的雜湊值
        result = 31 * result + age.hashCode()
        return result   //這樣，當name和age的雜湊值與另一個物件的一致時，得到的結果就是一樣的了
    }
}
```

現在再次進行操作：

![image-20231226151600596](https://s2.loli.net/2023/12/26/MsA7BdOH4IUWwxf.png)

所以，以後我們在重寫`equals`函式時，為了能夠適配所有的集合類，我們還需將其hashCode函式一併重寫，來保證一致性。

### Map映射

Map是一個非常特殊的集合類型，它儲存了一些的鍵值對，那麼什麼是鍵值對呢？

![image-20231226005615234](https://s2.loli.net/2023/12/26/pjHCWwcmxL74uve.png)

可以看到，學校裡面的學號對應了每一個學生，我們只需要知道某一個學生的學號，就可以快速尋找這個學生的姓名、年齡、性別等資訊，而Map就是為了儲存這樣的映射關係而存在的。

首先我們來看，如何定義一個鍵值對，官方為我們提供了一個非常方便的中綴函式：

```kotlin
public infix fun <A, B> A.to(that: B): Pair<A, B> = Pair(this, that)
```

我們只需要指定：

```kotlin
val pair: Pair<Int, String> = 10001 to "小明"   //得到一個由學號指向學生名稱的鍵值對
```

這樣，我們就成功建立出了一個映射關係，但是這僅僅是單個映射，如果我們想要儲存所有學生的學號映射關係，需要使用Map來實現，使用Map也非常簡單：

```kotlin
val map: MutableMap<Int, Student> = mutableMapOf(
    10001 to Student("小明", 18),
    10002 to Student("小紅", 17),
    10003 to Student("小剛", 19)
)
//使用mutableMapOf可以放入多個鍵值對，並生成一個Map物件
```

這樣我們就成功地將所有的鍵值對儲存在Map中了，我們接著來看看如何去訪問，比如現在我們要尋找指定學號的學生：

```kotlin
val student: Student? = map[10001]   //使用[]運算符透過Key尋找Value
```

可以看到，使用方式與前面的集合類和陣列非常類似，只不過訪問的不再是下標，而是對應的Key。同時，這裡得到的結果是一個可空類型的物件，為什麼會像這樣呢？

```kotlin
val student1: Student? = map[10001]   //得到小明這個物件
val student2: Student? = map[10005]   //Map中根本沒有鍵為10005的鍵值對，得到的結果是null
```

當Map中不存在指定Key時，會直接得到`null`作為結果，因此我們在處理從Map返回的Value時，需要考慮空指標問題。

```kotlin
map.contains(1)   //判斷是否包含指定Key
map.containsKey(1)   //同上
10001 in map    //同上
map.containsValue(Student("小明", 18))   //判斷是包含指定Value
```

**注意：**  Map中的鍵值對儲存，只能透過Key去訪問Value，而不能透過Value來反向尋找Key，映射關係是單向的。

我們可以直接獲取到Key和Value的集合：

```kotlin
val keys: MutableSet<Int> = map.keys   //以Set形式儲存的[10001, 10002, 10003]
val value: Collection<Student> = map.values    //以Collection介面類型返回的 [小明 (18), 小紅 (17), 小剛 (19)] 具體類型是Map的內部類實現的
```

遍歷一個Map也很簡單：

```kotlin
map.forEach { (k, v) -> println("鍵: $k, 值 $v") }  //forEach提供兩個參數，key和value

for (entry in map) {   //使用for循環也可以直接安排，這裡得到的是一個entry
    entry.key
    entry.value
}

for ((key, value) in map) {  //也可以可以直接寫成這樣
    println("鍵: $key, 值 $value")
}
```

我們再來看看如何向Map中添加新的鍵值對：

```kotlin
map[10004] = Student("小強", 18)   //跟之前一樣，直接對著賦值就行了
map.put(10004, Student("小強", 18))  //使用函式也可以，跟上面效果一樣
```

你甚至還能像這樣添加：

```kotlin
val newMap = map + (10004 to Student("小強", 18))   //添加新的鍵值對並生成一個新的Map
map += (10004 to Student("小強", 18))  //直接添加鍵值對到目前Map裡面
map += mapOf(10004 to Student("小強", 18))  //或者添加其他Map到此Map中
map.putAll(mapOf(10004 to Student("小強", 18)))   //跟上面一樣
map.putAll(setOf(10004 to Student("小強", 18)))   //鍵值對集合也可以的
```

不過需要注意的是，在Map中同樣的Key只能存在一個，這跟Set是一樣的：

```kotlin
map[10003] = Student("小強", 18)   //此時Map中已經存在Key為10003的鍵值對了，這會導致之前的結果被覆蓋
println(map)   //結果為 {10001=小明 (18), 10002=小紅 (17), 10003=小強 (18)}
```

當插入一個鍵值對時，如果存在相同Key會直接覆蓋掉之前的鍵值對，我們可以透過函式的返回值來得到被覆蓋的結果：

```kotlin
val old = map.put(10003, Student("小強", 18))   //put的返回值如果沒有覆蓋元素返回null，否則返回被覆蓋的元素
println("被覆蓋的$old")   //被覆蓋的小剛 (19)
```

我們也可以直接移除不需要的鍵值對，同樣是透過Key進行移除：

```kotlin
val old = map.remove(10001)   //使用remove函式移除指定鍵值對
println("被移除的$old")
```

各種花式移除：

```kotlin
map -= 10001   //等價於 map.remove(10001)
map -= listOf(10001, 10002)   //是的你沒猜錯，這個是批次移除
```

如果我們需要直接移除Value為某個Key的鍵值對，可以像這樣：

```kotlin
map.values.remove(Student("小明", 18))   //直接從values中移除，會使得整個鍵值對被移除
```

```kotlin
val map: MutableMap<Int, Student> = mutableMapOf(
    10001 to Student("小明", 18),
    10002 to Student("小紅", 17),
    10003 to Student("小明", 18)   //這裡存在兩個一樣的元素
)
map.values.remove(Student("小明", 18))   //透過這種方式移除也只會移除按順序下來的第一個
println(map)  // {10002=小紅 (17), 10003=小明 (18)}
```

有些時候，Map返回的結果是可空類型給我們造成了很多麻煩，可以透過以下方式解決：

```kotlin
//使用getOrDefault在沒有結果時返回給定的預設值
var student: Student = map.getOrDefault(10004, Student("小強", 16))
//跟上面一樣，只不過是使用函式式返回預設值
var student: Student = map.getOrElse(10004){ Student("小強", 16) }
```

```kotlin
//這個不僅能返回預設值，還能順手把預設值給加到Map裡面去，很方便
var student: Student = map.getOrPut(10004){ Student("小強", 16) }
println(map)  //結果為 {10001=小明 (18), 10002=小紅 (17), 10003=小剛 (19), 10004=小強 (16)}
```

有了Map之後，我們在處理一些映射關係的時候就很方便了。跟Set一樣，官方也提供了多種多樣的集合：

```kotlin
val map1 = mapOf(1 to "AAA")   //唯讀Map
val map2 = hashMapOf(1 to "AAA")   //不儲存Key順序的Map
val map3 = linkedMapOf(1 to "AAA")   //儲存Key順序的Map，跟mutableMapOf一樣
val map4 = sortedMapOf(1 to "AAA")   //根據排序規則自動對Key排序的Map
val map5 = emptyMap<Int, String>()   //空Map
val hashMap = HashMap<Int, String>()   //採用建構子建立的HashMap，不儲存Key順序的Map，同map2
val linkedHashSet = LinkedHashMap<Int, String>()   //採用建構子建立的LinkedHashMap，儲存Key順序的Map，同map3
```

### 疊代器

我們在一開始提到，集合類型的頂層介面都是一個叫做Collection的介面：

```kotlin
public interface Collection<out E> : Iterable<E> {  //繼承自Iterable介面
    ...
}
```

而在Iterable介面中，就定義了一個用於生成疊代器的函式：

```kotlin
public interface Iterable<out T> {
    /**
     * Returns an iterator over the elements of this object.
     */
    public operator fun iterator(): Iterator<T>
}
```

不僅僅是集合類，甚至在Array類中也定義了這樣的函式：

```kotlin
public class Array<T> {
    ...

    /**
     * Creates an [Iterator] for iterating over the elements of the array.
     */
    public operator fun iterator(): Iterator<T>
}
```

疊代器是每個集合類、陣列都可以生成的東西，它的作用很簡單，就是用於對內容的遍歷：

```kotlin
val list = listOf("AAA", "BBB", "CCC")
val iterator: Iterator<String> = list.iterator()   //透過iterator函式得到疊代器物件
```

那麼這個疊代器該如何使用呢？先來看介面定義：

```kotlin
public interface Iterator<out T> {
    //獲取下一個待遍曆元素
    public operator fun next(): T

    //如果還有元素沒有遍歷，那麼返回true否則返回false，而這個函式也是運算符重載函式正好對應著 for in 操作
    public operator fun hasNext(): Boolean
}
```

透過使用疊代器，我們就可以實現對集合中的元素的進行遍歷，就像我們遍歷陣列那樣，它的運作機制大概是：

![image-20221002150914323](https://s2.loli.net/2023/12/26/Lq7D1vTyabXlSR4.png)

一個新的疊代器就像上面這樣，預設有一個指向集合中第一個元素的指標：

![image-20221002151110991](https://s2.loli.net/2023/12/26/VayvKxstH2enmqE.png)

每一次`next`操作，都會將指標後移一位，直到完成每一個元素的遍歷，此時再呼叫`next`將不能再得到下一個元素。至於為什麼要這樣設計，是因為集合類的實現方案有很多，可能是鏈式儲存，也有可能是陣列儲存，不同的實現有著不同的遍歷方式，而疊代器則可以將多種多樣不同的集合類遍歷方式進行統一，只需要各個集合類根據自己的情況進行對應實現就行了。

實際上疊代器的功能設計非常純粹，就是看有沒有下一個，有的話就拿出來，所以使用疊代器可以直接用一個while循環搞定：

```kotlin
val iterator: Iterator<String> = list.iterator()
while (iterator.hasNext()) {   //使用while不斷判斷是否存在下一個
    println(iterator.next())   //每次循環都取出一個
}
```

疊代器的出現，使得無論我們使用哪一種集合，都可以使用同樣的方式對元素進行遍歷，這統一了遍歷操作的使用：

```kotlin
fun <T> forEach(iterator: Iterator<T>) {   //統一接收疊代器物件
    while (iterator.hasNext()) {
        println(iterator.next())
    }
}

fun main() {  //現在無論什麼集合/陣列都可以按照統一的方式去進行處理
    forEach(listOf("AAA", "BBB", "CCC").iterator()) 
    forEach(setOf("AAA", "BBB", "CCC").iterator())
    forEach(arrayOf("AAA", "BBB", "CCC").iterator())
    forEach(mapOf(1 to "AAA", 2 to "BBB",3 to "CCC").iterator())
}
```

注意，疊代器的使用是一次性的，用了之後就不能用了，如果需要再次進行遍歷操作，那麼需要重新生成一個疊代器物件。

只要是重寫了`operator fun iterator()`函式的類型，都可以使用for..in這樣的語法去進行遍歷：

```kotlin
for (s in listOf("AAA", "BBB", "CCC")) {
   ...
}
```

因此，陣列和集合類都支援使用for循環遍歷也就不奇怪了，哪怕是我們自己定義的類，只要實現這個函式都是支援的：

```kotlin
class Test : Iterable<String> {    //這個介面實不實現其實都無所謂
  	//實現這個運算符重載函式iterator是必須要的，否則不支援
    override operator fun iterator(): Iterator<String> = TestIterator()

    class TestIterator: Iterator<String> {  //自己隨便寫一個疊代器實現
        override fun hasNext(): Boolean = true
        override fun next(): String = "666"
    }
}

fun main() {
    val test = Test()
    for (s in test) {
        println(s)
    }
}
```

包括我們前面使用的Range語法，其本身也是一個支援生成疊代器的類：

```kotlin
val range: IntRange = 1..3
val iterator: Iterator<Int> = range.iterator()
```

實際上，所有使用for..in語法的操作，最後都會被編譯為使用疊代器的while操作：

```kotlin
val list = mutableListOf("AAA", "BBB", "CCC")   //編譯前
for (s in list) {
    list.add("DDD")
}
```

```kotlin
val list = mutableListOf("AAA", "BBB", "CCC")   //編譯後
val iterator: Iterator<String> = list.iterator()
while (iterator.hasNext()) {
    val next = iterator.next()
    println(next)
}
```

是不是突然覺得有點豁然開朗？至此，我們已經完成解釋清楚for..in操作的原理了。

特別的，對於List來說，它還有一個非常特殊的ListIterator疊代器：

```kotlin
val iterator: ListIterator<String> = list.listIterator()   //使用listIterator函式來獲取ListIterator
println(iterator.next())  //不僅可以正著疊代
println(iterator.nextIndex())   //還可以直接告訴你下一個疊代的是List的第幾個元素
println(iterator.previous())   //還能反著來
```

ListIterator疊代器是普通疊代器的強化版本，它可以實現列表中元素的雙向遍歷，並且可以得到目前疊代的元素下標。

最後，我們再來探討一個之前可能遇到過的問題：

```kotlin
val list = mutableListOf("AAA", "BBB", "CCC")
for (s in list) {   //在遍歷List時，不斷往裡面添加新的元素
    list.add("DDD")
}
```

此程式執行會直接得到一個報錯：

![image-20231226173249641](https://s2.loli.net/2023/12/26/qjnkJfX41SlKoNQ.png)

在JVM環境下，Kotlin預設不支援在疊代時修改集合裡面的內容，無論是插入新的元素還是移除元素，都會觸發並發修改異常。為了解決這個問題，Kotlin為所有的MutableCollection（所有非唯讀集合類）提供了一個特殊的用於生成MutableIterator的函式，只要我們使用的不是唯讀的集合類，都可以獲得這個特殊的疊代器，它支援在遍歷時對元素進行刪除：

```kotlin
val list = mutableListOf("AAA", "BBB", "CCC")
val iterator: MutableIterator<String> = list.iterator()
while (iterator.hasNext()) {
  	iterator.next()
    iterator.remove()   //刪除目前疊代器已經遍歷的最後一個元素
}
```

有關疊代器的相關知識就先到這裡了。

### 集合與陣列擴展操作

前面我們介紹了Kotlin提供的幾個常用集合類，我們在使用這些集合類的時候，為了更加方便，官方提供了很多用於集合、陣列類型的擴展操作，我們來學習一下吧，因為這些擴展運算元組和集合都可以使用，我們就盡量以List為例進行講解。

首先是陣列跟集合的同步，有些時候我們可能拿到的是一個陣列物件，但是我們希望將其轉換為集合類進行操作，我們可以使用陣列提供的集合快速轉換函式來進行轉換：

```kotlin
val array = arrayOf("AAA", "BBB", "CCC")
val list: List<String> = array.toList()
val list: MutableList<String> = array.toMutableList()
val set: Set<String> = array.toSet()
val set: MutableSet<String> = array.toMutableSet()
```

這樣，如果我們發現陣列無法滿足我們對於其元素的操作，可以直接轉換為集合類進行操作，方便你我。

接下來是映射操作（注意這裡說的map跟我們前面說的集合Map是兩個概念，別搞混了）它可以將集合類、陣列的元素類型進行轉換，比如我們現在有一個字串集合，但是我們現在希望把它變成記錄每一個字串長度的Int集合，該怎麼做呢？

```kotlin
val list = listOf("AAA", "BB", "CCCCC")
val lenList: List<Int> = list.map { it.length }   //使用map函式，傳入自訂的轉換操作函式，就可以對元素進行轉換了
```

我們可以利用這種操作來為裡面的每一個元素添加編號：

```kotlin
val list = listOf("AAA", "BBB", "CCC")  //使用mapIndexed還可以額外附帶一個index參數
val mapList: List<String> = list.mapIndexed { index, it -> "$index.${it}" }
println(mapList)  //結果 [0.AAA, 1.BBB, 2.CCC] 快速編號操作
```

利用映射操作，我們可以快速對集合中是元素依次進行修改，也可以對集合中的元素進行類型轉換，非常方便。

對於Map類型，我們還可以單獨對所有Key或是Value進行操作：

```kotlin
val numbersMap = mapOf("key1" to 1, "key2" to 2, "key3" to 3)
println(numbersMap.mapKeys { it.key.uppercase() })   //對所有的Key進行Map操作
println(numbersMap.mapValues { it.value + it.key.length })
```

我們接著來看下一個，壓縮操作，它可以將目前集合元素和另一個集合中具有相同索引的元素組合起來，生成一個裝滿Pair的列表：

```kotlin
val list1 = listOf(1, 2, 3)
val list2 = listOf("AAA", "BBB", "CCC")
val pairs: List<Pair<Int, String>> = list1.zip(list2)
println(pairs)
```

利用壓縮操作我們可以快速將兩個List集合揉成一個Map集合：

```kotlin
val map = mutableMapOf<Int, String>()
map.putAll(list1.zip(list2))
println(map)  //結果 {1=AAA, 2=BBB, 3=CCC}
```

既然能壓縮還能解壓：

```kotlin
val list = listOf(1 to "AAA", 2 to "BBB", 3 to "CCC")  //把合在一起的Pair每個元素都分開
val unzipList: Pair<List<Int>, List<String>> = list.unzip()  //轉換出來是一個存放兩個List的Pair
println(unzipList)
```

有些時候我們還可以使用另一種方式將普通集合轉換為Map映射，比如associate操作：

```kotlin
val list = listOf("AAA", "BBB", "CCC")
//使用associateWith快速構建以列表中每個元素為Key的Map映射
val associate: Map<String, Int> = list.associateWith { it.length }   //提供一個函式，返回值作為生成的Map對應Key的Value
println(associate)  //結果 {AAA=3, BBB=3, CCC=3}
```

還有對應的反向操作：

```kotlin
val list = listOf("AAA", "BBB", "CCC")
//使用associateBy快速構建以列表中每個元素為Value的Map映射
val associate: Map<Int, String> = list.associateBy { it.length }   //提供一個函式，返回值作為生成的Map對應Value的Key
println(associate)   //結果{3=CCC}，因為上面生產出來的Key全是3，覆蓋完只剩下最後一個了
```

如果你覺得以上兩種方式都不是很靈活，你也可以自己根據情況自行構建一個Pair作為結果返回：

```kotlin
val associate: Map<String, Int> = list.associate { it to it.length }  //返回一個Pair
```

我們接著來看，對於一些嵌套集合和陣列來說，有時候處理裡面的資料會變得很棘手：

```kotlin
val list = listOf(listOf("AAA", "BBB"), listOf("CCC", "DDD"))
//現在我們想要遍歷這個嵌套List中的每一個元素，需要兩層for循環
list.forEach { it.forEach { item -> println(item) } }
```

那麼有沒有辦法能夠把這個嵌套的集合內所有的集合全部拆出來，全部存在一個不嵌套的集合中呢？我們可以使用扁平化操作：

```kotlin
val list = listOf(listOf("AAA", "BBB"), listOf("CCC", "DDD"))
val flatten: List<String> = list.flatten()   //使用flatten函式將嵌套集合扁平化
println(flatten)   //可以看到內容自動被展平了 [AAA, BBB, CCC, DDD]
```

結合之前學習的映射操作，我們還可以在展平元素的同時對元素進行映射，非常適合下面這種情況：

```kotlin
//把下面這個給展平
val list = listOf(Container(listOf("AAA", "BBB")), Container(listOf("CCC", "DDD")))
```

可以看到，這個List很噁心，它內層存放的集合是被套在一個物件中的，更準確的說，這是一個`List<Container>`類型的列表，但是現在我們希望的是取出裡面每一個物件儲存的List然後拿來展平，可以像這樣：

```kotlin
//使用flatMap函式進行操作，支援自訂獲取列表然後再進行扁平化操作
val flatList: List<String> = list.flatMap { it.list }   //透過Lambda將每一個Container映射為List
println(flatList)   //結果為：[AAA, BBB, CCC, DDD]
```

其實還有一個`joinToString`函式，但是前面陣列部分已經講解過了，使用方式是一樣的，這裡就不做介紹了。

有時候我們想要移除集合中某些不滿足條件的元素，我們可以使用過濾操作來完成：

```kotlin
val list = listOf("AAA", "BB", "CCC")
//使用filter來過濾不滿足條件的元素，這裡的意思是只保留長度大於2的字串
val filterList: List<String> = list.filter { it.length > 2 }
println(filterList)  //結果為：[AAA, CCC]
```

```kotlin
val numbersMap = mapOf("key1" to 1, "key2" to 2, "key3" to 3, "key11" to 11)
//Map同樣支援這樣的操作
val filteredMap = numbersMap.filter { (key, value) -> key.endsWith("1") && value > 10}
println(filteredMap)
```

還有快速過濾所有空值的操作：

```kotlin
val list = listOf("AAA", null, "BBB", null)
val filterList: List<String> = list.filterNotNull()
println(filterList)   //結果 [AAA, BBB]
```

甚至還可以快速過濾出指定類型的集合：

```kotlin
val list = listOf("AAA", Any(), "BBB", 123, 3.14)
val filterList: List<String> = list.filterIsInstance<String>()  //快速過濾出所有的String元素
println(filterList)   //結果 [AAA, BBB]
```

透過過濾操作可以快速篩選出我們需要的那些元素，當然，如果我們既需要篩選出來的元素，也需要篩選出去的元素，我們可以使用分區操作：

```kotlin
val list = listOf("AA", "BBB", "CC", "DDD")
//分區操作得到一個匹配列表和一個不匹配列表
val (match, mismatch) = list.partition { it.length > 2 }
println("匹配的列表: $match")
println("不匹配的列表: $mismatch")
```

不愧是Kotlin，甚至連一個篩選功能都可以做的這麼全面。還有專門用於測試元素是否滿足條件的：

```kotlin
val list = listOf("AA", "BBB", "CC", "DDD")
list.any { it.length > 2 }  //判斷集合中是否至少存在一個元素滿足條件
list.none { it.length > 2 }  //判斷集合中是否不存在任何一個元素滿足條件
list.all { it.length > 2 }   //判斷集合中是否每一個元素都滿足條件
```

我們接著來看非常實用的分組操作，它可以將元素按類別進行分組，以Map的形式返回：

```kotlin
val list = listOf("AA", "BBB", "CC", "DDD")
println(list.groupBy { it.length })  //按照字串的長度進行分組
//得到 {2=[AA, CC], 3=[BBB, DDD]}
```

我們接著來看對於集合的裁剪相關操作，首先是對一個集合進行切片，比如我們只想要其中一段元素：

```kotlin
val list = listOf("AA", "BBB", "CC", "DDD")
println(list.slice(1..2))   //截取從第二個元素到第三個元素共兩個元素的List片段，結果：[BBB, CC]
println(list.take(2))  //使用take獲取從第一個元素開始的長度為N的元素片段，結果：[AA, BBB]
println(list.takeLast(2)) //同上，但是從尾部倒著來，結果：[CC, DDD]
println(list.drop(2))   //這個跟take是反著的，直接跳過前N個元素截取，結果：[DDD]
println(list.dropLast(2))  //不用多說了吧
println(list.takeWhile { it.length > 2 })   //從第一個元素開始，依次按照給定的函式進行判斷，如果判斷成功則添加到返回列表中，直到遇到一個不滿足條件的就返回，這裡的結果就是 [AA]
...
```

前面我們介紹了嵌套集合的扁平化，那有沒有辦法吧扁平化的集合給重新分塊呢？

```kotlin
val list = listOf("AA", "BBB", "CC", "DDD")
//使用chunked進行分塊，這裡2個元素為一組進行分塊，得到一個嵌套的集合
println(list.chunked(2))   //結果 [[AA, BBB], [CC, DDD]]
```

有關集合相關的擴展操作，我們就先介紹到這裡了，想要了解更多集合特性的小伙伴請參考官網：https://kotlinlang.org/docs/collections-overview.html

### 序列

除了集合，Kotlin標準庫還包含另一種類型：*序列*（[`Sequence`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.sequences/-sequence/index.html)）與集合不同，序列不包含元素，它在執行時生成元素，Sequence與Iterable介面功能相似，介面定義如下，同樣只包含一個生成疊代器的函式：

```kotlin
public interface Sequence<out T> {
    public operator fun iterator(): Iterator<T>
}
```

那既然功能一樣，為什麼要專門搞一個序列呢？這不是多此一舉嗎？序列實際上是一個延遲獲取資料的集合，只有需要元素時才會生產元素並提供給外部，包括所有對元素操作，並不是一次性全部處理，而是根據情況選擇合適的元素進行操作。使用序列能夠在處理大量資料時獲得顯著的效能提升。

要建立一個序列非常簡單，使用generateSequence函式即可：

```kotlin
val sequence: Sequence<Int> = generateSequence {
    println("生成一個新的元素")
    10   //返回值就是生成的元素
}
```

可以看到generateSequence得到的結果並沒有在一開始執行println，因為序列的資料處理是惰性的，在我們添加

```kotlin
sequence.forEach { println(it) }
```

此時控制台才開始列印生成的Lambda函式。同樣的，所有擴展操作同樣是惰性的，我們可以來比較一下：

```kotlin
val list = listOf("AA", "BBB", "CCC", "DD", "EEE", "FF", "GGG", "HH")
//以下操作用於獲取前兩個長度大於2的字串，並進行小寫轉換操作
val result = list.filter {
    println("進行過濾操作: $it")
    it.length > 2
}.map {
    println("進行小寫轉換操作")
    it.lowercase()
}.take(2)
```

![image-20231226232423784](https://s2.loli.net/2023/12/26/TjanZ3eEgsxzo2X.png)

可以看到，在直接使用集合的情況下，整個工序是按照順序在向下執行的，並且每一道工序都會對所有的元素依次進行操作，但是實際上根據我們的要求，最後只需要兩個滿足條件的即可，如果這個是一個資料量非常龐大的集合，會導致執行效率很低。我們現在換成序列試試看：

```kotlin
//使用asSequence函式將集合轉換為一個序列
val result = list.asSequence().filter {
    println("進行過濾操作: $it")
    it.length > 2
}.map {
    println("進行小寫轉換操作")
    it.lowercase()
}.take(2)
println(result)  //如果這句不執行，不獲取元素，以上整個操作都是不會進行的
```

![image-20231226232732629](https://s2.loli.net/2023/12/26/lMRLvSo1J5ydni6.png)

可以看到，序列根據我們的操作流程，對資料的操作也進行了最佳化，執行次數明顯減少，並且使用序列後只有我們從序列讀取資料時才會開始執行我們定義好的工序，可見，序列執行的各種操作，僅僅是記錄到序列中，並沒有在一開始就執行，而是需要的時候才開始獲取，因此才可以做到上面這樣的操作。

> 這與Java中的Stream非常相似。

當然，序列並不是隨時隨地都可以使用的，我們還是要根據實際情況決定是否要使用序列，如果在資料量特別龐大的情況下，使用序列處理會更好，但是如果資料量很小，使用序列反而會增加開銷。

## 特殊類型介紹

除了我們之前學習的普通class類型之外，Kotlin還為我們提供了更多種類的類型，以應對不同的情況。

這些特殊類型本質上依然是class但是存在一些限制或是特殊情況。

### 資料類型

對於那些只需要儲存資料的類型，我們常常需要為其重寫`toString`、`equals`等函式，針對於這種情況下，Kotlin為我們提供了專門的資料類，資料類不僅能像普通類一樣使用，並且內建我們需要的額外成員函式，比如列印到輸出、比較實例、複製實例等。

宣告一個資料類非常簡單：

```kotlin
//在class前面添加data關鍵字表示為一個資料類
data class User(val name: String, val age: Int)
```

資料類宣告後，編譯器會根據主建構子中宣告的所有屬性自動為其生成以下函式：

- `.equals()`/`.hashCode()`
- `.toString()`生成的字串格式類似於`"User(name=John, age=42)"`
- `.componentN()`與按宣告順序自動生成用於解構的函式
- `.copy()`用於對物件進行複製

我們可以來試試看：

```kotlin
fun main() {
    val user1 = User("小明", 18)
    val user2 = User("小明", 18)
    println(user1)   //列印出來就是格式化的字串 User(name=小明, age=18)
    println(user1 == user2)   //true，因為自動重寫了equals函式
    val (name, age) = user1   //自動添加componentN函式，因此支援解構操作
    println("名稱: $name, 年齡: $age")
}
```

當然，為了確保生成程式碼的一致性和有效性，資料類必須滿足以下要求：

- 主建構子中至少有一個參數。
- 主建構子中的參數必須標記為`val`或`var`。
- 資料類不能是抽象的、開放的、密封的或內部的。

此外，資料類的成員屬性生成遵循有關成員繼承的以下規則：

- 如果資料類主體中`.equals()` `.hashCode()`或`.toString()`等函式存在顯式（手動）實現，或者在父類中有`final`實現，則不會自動生成這些函式，並使用現有的實現。

  ```kotlin
  data class User(val name: String, val age: Int) {
    	//如果已經存在toString的情況下，不會自動生成
      override fun toString(): String = "我是自訂的toString"
  }
  
  fun main() {
      val user = User("小明", 18)
      println(user)   //結果: 我是自訂的toString
  }
  ```

- 如果超類型具有`open` `.componentN()`函式並返回相容類型，則為資料類生成相應的函式，並覆蓋超類型的函式。如果由於一些關鍵字導致無法重父類對應的函式會導致直接報錯。

  ```kotlin
  abstract class AbstractUser {
    	//此函式必須是open的，否則無法被資料類繼承
      open operator fun component1() = "盧本偉厲害"
  }
  
  data class User(val name: String, val age: Int): AbstractUser()  //自動覆蓋掉父類的component1函式
  ```

- 不允許為`.componentN()`和`.copy()`函式提供顯式實現。

  ![image-20231227125926658](https://s2.loli.net/2023/12/27/fxIC8ZAdqzTKDs9.png)

注意，編譯器會且只會根據主建構子中定義的屬性生成對應函式，如果有些時候我們不希望某些屬性被添加到自動生成的函式中，我們需要手動將其移出主建構子：

```kotlin
data class Person(val name: String) {
    var age: Int = 0   //age屬性不會被處理
}
```

此時生成的所有函式將不會再考慮age屬性：

```kotlin
fun main() {
    val person1 = Person("John")
    val person2 = Person("John")
    person1.age = 10
    person2.age = 20

    println("person1 == person2: ${person1 == person2}")
    // person1 == person2: true
    println("person1 with age ${person1.age}: $person1")
    // person1 年齡為 10: Person(name=John)
    println("person2 with age ${person2.age}: $person2")
    // person2 年齡為 20: Person(name=John)
}
```

資料類內建一個複製物件的函式，使用`.copy()`函式複製物件，允許您更改其*一些*屬性，而其餘的保持不變。此函式對上述`User`類的實現如下：

```kotlin
data class User(val name: String, val age: Int)

fun main() {
    val user = User("小明", 18)
    val copyUser = user.copy()   //使用複製函式生成一個內容完全一樣的新物件
    println(user == copyUser)
    println(user === copyUser)
}
```

在copy函式還可以在複製過程中手動指定屬性的值：

```kotlin
val user = User("小明", 18)
println(user.copy(age = 17))   //結果為 User(name=小明, age=17)
```

### 列舉類型

我們知道，在Kotlin中有一個Boolean類型，它只有兩種結果，要嘛為false要嘛為true，這代表它的兩種狀態真和假。有些時候，可能兩種狀態並不能滿足我們的需求，比如一個交通訊號燈，它具有三種狀態：紅燈、黃燈和綠燈。

如果我們想要儲存和表示自訂的多種狀態，使用列舉類型就非常合適：

```kotlin
//在類前面添加enum表示這是一個列舉類型
enum class LightState {
    GREEN, YELLOW, RED   //直接在列舉類內部寫上所有列舉的名稱，一般全部用大寫字母命名
}
```

列舉類的值只能是我們在類中定義的那些列舉，不可以存在其他的結果，列舉類型同樣也是一個普通的類，只是存在值的限制。

要使用一個列舉類的物件，可以透過類名直接獲取定義好的列舉：

```kotlin
fun main() {
    val state: LightState = LightState.RED  //直接得到紅燈
  	println(state.name)   //內建name屬性，也就是我們編寫的列舉名稱，這裡是RED
}
```

同樣的，列舉類也可以具有成員：

```kotlin
//同樣可以定義成員變數，但是不能命名為name，因為name拿來返回列舉名稱了
enum class LightState(val color: String) {
    GREEN("綠燈"), YELLOW("黃燈"), RED("紅燈");  //列舉在定義時也必須填寫參數，如果後面還要編寫成員函式之類的其他內容，還需在末尾添加分號結束
  
  	fun isGreen() = this == LightState.GREEN  //定義一個函式也是沒問題的
}
```

我們可以像普通類那樣正常使用列舉類的成員：

```kotlin
val state: LightState = LightState.RED
println("訊號燈的顏色是: ${state.color}")
println("訊號燈是否可以通行: ${state.isGreen()}")
```

列舉類型可以用於`when`表達式進行判斷，因為它的狀態是有限的：

```kotlin
val state: LightState = LightState.RED
val message: String = when(state) {
    LightState.RED -> "禁止通行"
    LightState.YELLOW -> "減速通行"
    LightState.GREEN -> "正常通行"
}
println(message)   //結果為: 禁止通行
```

在列舉類中也可以編寫抽象函式，抽象函式需要由列舉自行實現：

```kotlin
enum class LightState(val color: String) {
    GREEN("綠燈"){
        override fun test() = println("我是綠燈，表示可以透過")
    }, YELLOW("黃燈") {
        override fun test() = println("我是黃燈，是讓你減速，不是讓你踩油門加速過去")
    }, RED("紅燈") {
        override fun test() = println("我是紅燈，禁止通行")
    };
    abstract fun test()   //抽象函式
}

fun main() {
    val state: LightState = LightState.RED
    state.test()   //呼叫函式: 我是紅燈，禁止通行
}
```

如果列舉類實現了某個介面，同樣可以像這樣去實現：

```kotlin
interface Message {
    fun test()
}

enum class LightState(val color: String) : Message {
    GREEN("綠燈"){
        override fun test() = println("我是綠燈，表示可以透過")
    }, YELLOW("黃燈") {
        override fun test() = println("我是黃燈，是讓你減速，不是讓你踩油門加速過去")
    }, RED("紅燈") {
        override fun test() = println("我是紅燈，禁止通行")
    };
}
```

```kotlin
enum class LightState(val color: String) : Message {
    GREEN("綠燈"), YELLOW("黃燈"), RED("紅燈");
    override fun test() = println("")
}
```

列舉類也為我們準備了很多的函式：

```kotlin
val state: LightState = LightState.valueOf("RED")   //透過valueOf函式以字串名稱的形式轉換為對應名稱的列舉
val state: LightState = enumValueOf<LightState>("RED")   //同上
println(state)
println(state.ordinal)   //列舉在第幾個位置
println(state.name)   //列舉名稱
```

```kotlin
val entries: EnumEntries<LightState> = LightState.entries  //一鍵獲取全部列舉，得到的結果是EnumEntries類型的，他是List的子介面，因此可以當做List來使用
val values: Array<LightState> = enumValues<LightState>()   //或者像這樣以Array形式獲取到所有的列舉
println(entries)
```

### 匿名類和伴生物件

有些時候，可能我們並不需要那種透過`class`關鍵字定義的物件，而是以匿名的形式建立一個臨時使用的物件，在使用完之後就不再需要了，這種情況完全沒有必要定義一個完整的類型，我們可以使用匿名類的形式去編寫。

```kotlin
val obj = object {   //使用object關鍵字宣告一個匿名類並建立其物件，可以直接使用變數接收得到的物件
  	val name: String = ""
    override fun toString(): String = "我是一個匿名類"   //匿名類預設繼承於Any，可以直接重寫其toString
}
println(obj)
```

可以看到，匿名類除了沒名字之外，也可以定義成員，只不過這種匿名類不能定義任何建構子，因為它是直接建立的，這種寫法我們也可以叫做*物件表達式*。

匿名類不僅可以直接定義，也可以作為某個類的子類定義，或是某個介面的實現：

```kotlin
interface Person {
    fun chat()
}

fun main() {
    val obj: Person = object : Person {   //直接實現Person介面
        override fun chat() = println("厲害啊")
    }
    obj.chat()  //當做Person的實現類使用
}
```

```kotlin
interface Person
open class Human(val name: String)

fun main() {
    val obj: Human = object : Human("小明"), Person {   //繼承類時，同樣需要呼叫其建構子
        override fun toString() = "我叫$name"   //因為是子類，直接使用父類的屬性也是沒問題的
    }
    println(obj)
}
```

可以看到，平時我們無法直接實例化的介面或是抽象類，可以透過匿名類的形式得到一個實例化物件。

我們再來看下面這種情況：

```kotlin
interface KRunnable {
    fun invoke()   //此類型是一個介面且只包含一個函式
}
```

根據我們上面學習的用法，如果我們想要使用其匿名類，可以像這樣編寫：

```kotlin
fun main() {
    val runnable = object : KRunnable {   //使用匿名類的形式編寫KRunnable的實現類物件
        override fun invoke() {
            println("我是函式invoke的實現")
        }    
    }
    runnable.invoke()
}
```

特別的，對於只存在一個抽象函式的介面稱為*函式式介面*或*單一抽象方法（SAM）介面*，函式式介面可以有N個非抽象成員，但是只能有一個抽象成員。對於函式式介面，可以使用我們前面介紹的Lambda表達式來使程式碼更簡潔：

```kotlin
fun interface KRunnable {  //在介面宣告前面添加fun關鍵字
    fun invoke()
}

...

fun main() {
    val runnable = KRunnable {   //支援使用Lambda取代
        println("我是函式invoke的實現")
    }
    runnable.invoke()
}
```

我們再來看下面這種情況：

```kotlin
fun interface Printer {
    fun print()
}

fun test(printer: Printer) {   //需要Printer介面實現物件
    printer.print()
}
```

我們在呼叫test時，也可以寫的非常優雅：

```kotlin
fun main() {
    test {   //直接Lambda一步到位
        println("Hello World")
    }
}
```

正是因為有了匿名類，所以有些時候我們透過函式得到的結果，可能並不是某個具體定義的類型，也有可能是直接採用匿名形式建立的匿名類物件：

```kotlin
open class Human(val name: String)

fun test() = object: Human("小明") {  //返回的一個匿名類物件
  	val age: Int = 10
    override fun toString() = "我叫$name"
}

fun main() {
    println(test().name)
    println(test().age)  //編譯錯誤，因為返回的類型是Human，由於其匿名特性，只能當做Human使用
}
```

`object`關鍵字除了用於宣告匿名類型，也可以用於宣告單例類。單例類是什麼意思呢？就像它的名字一樣，在整個程式中只能存在一個物件，也就是單個實例，不可以建立其他的物件，始終使用的只能是那一個物件。

```kotlin
object Singleton {   //宣告的一個單例類
    private var name = "你幹嘛"
    override fun toString() = "我叫$name"
}

fun main() {
    val singleton = Singleton  //透過類名直接得到此單例類的物件
  	//不可以透過建構子的形式建立物件
    println(singleton)
}
```

```kotlin
object Singleton {
    fun test() = println("原神，啟動！")
}

fun main() {
    Singleton.test()   //單例定義的函式直接使用類名即可呼叫
}
```

用起來與Java中的靜態屬性挺像的，只不過性質完全不一樣。單例類的這種性質在很多情況下都很方便，比如我們要編寫某些工具操作，可以直接使用單例類的形式編寫。

現在我們希望一個類既支援單例類那樣的直接呼叫，又支援像一個普通class那樣使用，這時該怎麼辦呢？

我們可以使用半生物件來完成，實際上就是將一個單例類寫到某個類的內部：

```kotlin
class Student(val name: String, val age: Int) {
  	//使用companion關鍵字在內部編寫一個伴生物件，它同樣是單例的
    companion object Tools {
      	//伴生物件定義的函式可以直接透過外部類名呼叫
        fun create(name: String, age: Int) = Student(name, age)
    }
}

fun main() {
  	//現在Student不僅具有物件的函式，還可以透過類名直接呼叫其伴生物件透過的函式
    val student = Student.create("小明", 18)
  	println(student.toString())
}
```

伴生物件在Student類載入的時候就自動建立好了，因此我們可以實現直接使用。

### 委託模式

在有些時候，類的繼承在屬性的擴展上起到了很大的作用，透過繼承我們可以直接獲得某個類的全部屬性，而不需要再次進行編寫，不過，現在有了一個更好的繼承替代方案，那就是*委託模式*（在設計模式中也有提及）名字雖然聽起來很進階，但是其實很簡單，比如我們現在有一個介面：

```kotlin
interface Base {
    fun print()
}
```

正常情況下，我們需要編寫一個它的實現類：

```kotlin
class BaseImpl(val x: Int) : Base {
    override fun print() = println(x)
}
```

現在我們換一個思路，我們再來建立一個實現類：

```kotlin
class Derived(val base: Base): Base {   //將一個Base的實現類作為屬性儲存到類中，同樣實現Base介面
    override fun print() = base.print()   //真正去實現這個介面的，實際上並不是目前類，而是被拉進來的那個替身
}
```

這就是一個非常典型的委託模型，且大量實踐已證明委託模式是實現繼承的良好替代方案。

Kotlin對於這種模式同樣給予了原生支援：

```kotlin
interface Base {
    fun print()
}

class BaseImpl(val x: Int) : Base {
    override fun print() = println(x)
}

class Derived(val b: Base): Base by b  //使用by關鍵字將所有介面待實現操作委託給指定成員
```

這樣就可以輕鬆實現委託模式了。

除了類可以委託給其他物件之外，類的成員屬性也可以委託給其他物件：

```kotlin
import kotlin.reflect.KProperty

class Example {
    var p: String by Delegate()  //屬性也可以使用by關鍵字委託給其他物件
}

// 委託的類
class Delegate { 
  	//需要重載屬性的獲取和設定兩個運算
    operator fun getValue(thisRef: Any?, property: KProperty<*>): String {
        return "$thisRef, 這裡委託了 ${property.name} 屬性"
    }

    operator fun setValue(thisRef: Any?, property: KProperty<*>, value: String) {
        println("$thisRef 的 ${property.name} 屬性賦值為 $value")
    }
}

fun main() {
    println(Example().p)
}
```

不過，自己去定義一個類來進行委託實在是太麻煩了，Kotlin在標準庫中也為我們提供了大量的預設函式：

```kotlin
class Example {
    val p: String by lazy { "厲害啊" }   //lazy為我們生成一個委託物件，這樣在獲取屬性值的時候就會執行lazy裡面的操作了，看起來效果就像是延遲執行一樣，由於只能獲取，所以說只支援val變數
}

fun main() {
    println(Example().p)
}
```

也可以設定觀察者，即時觀察變數的變化：

```kotlin
class Example {
    var p: String by Delegates.observable("我是初始值") {
            prop, old, new ->
        println("檢測到$prop 的值發生變化，舊值：$old -> 新值：$new")
    }
}

fun main() {
    Example().p = "你幹嘛"
}
```

屬性也可以直接將自己委託給另一個屬性：

```kotlin
class Example(var a: String) {
    var p: String by ::a   //使用雙冒號來委託給其他屬性
}

fun main() {
    val example = Example("你幹嘛")
    println(example.p)
}
```

相信各位應該能猜到，這樣委託給其他屬性，目前屬性的值修改，會直接導致其他屬性的值也會修改，相反同樣它們已經被相互綁定了。

屬性也可以被委託給一個Map來進行儲存：

```kotlin
class User(map: MutableMap<String, Any>) {
    var name: String by map   //直接委託給外部傳入的Map集合
    var age: Int by map   //變數的值從Map中進行存取
    override fun toString(): String = "名稱: $name, 年齡: $age"
}

fun main() {
    val map: MutableMap<String, Any> = mutableMapOf(
        "name" to "John Doe",
        "age"  to 25
    )
    val user = User(map)
    println(user)   //名稱: John Doe, 年齡: 25
  	map["age"] = 10   //映射的值修改會直接影響變數的值
    println(user)  //名稱: John Doe, 年齡: 10
}
```

注意，在使用不可變的Map時，只能給val類型變數進行委託，因為不可修改。

### 密封類型

有些時候，我們可能會編寫一些類給其他人使用，但是我們不希望他們隨意繼承使用我們提供的類，我們只希望在我們提供的框架內部自己進行使用，這時我們就可以將類或介面設定為密封的。

密封類的所有直接子類在編譯時都是已知的。不得在定義密封類的模組和包之外出現其他子類。例如，第三方項目無法在其程式碼中擴展您的密封類。因此，密封類的每個實例都有一個來自預設好的類型，且該類型在編譯該類時是已知的。

```kotlin
package com.test

sealed class A   //宣告密封類很簡單，直接添加sealed關鍵字即可
sealed class B: A()   //密封類同一個模組或包中可以隨意繼承，並且子類也可以是密封的
```

當我們在其他包中使用這個密封類，在其他包或模組中無法使用：

```kotlin
class C: A()   //編譯錯誤，不在同一個模組

fun main() {
    val b = B()   //編譯錯誤，不可以實例化
}
```

密封類將類的使用嚴格控制在了模組內部，包括密封介面及其實現也是如此：一旦編譯了具有密封介面的模組，就不會出現新的實現類。

從某種意義上說，密封類類似於列舉類：列舉類型的值數量也受到限制，由我們自己定義，但每個列舉變數僅作為*單個實例*存在，而密封類的子類可以有*多個*實例，每個實例都有自己的狀態。密封類本身也是抽象的，它不能直接實例化，並且可以具有`abstract`成員：

```kotlin
sealed class A
sealed class B: A() {
    abstract fun test()
}
```

密封類繼承後也可以使其不繼續密封，讓外部可以正常使用：

```kotlin
sealed class A
class B: A()
class C: A()
class D: A() //不添加sealed關鍵字使其不再密封
```

但是由於類A是密封的，因此所有繼承自A的類只能是我們自己寫的，別人無法編寫繼承A的類，除非我們將某個繼承A的類設定為open特性，允許繼承。因此，這也進一步證明密封類在一開始就確定了有哪些子類。

由於密封類能夠確定，所以在使用when進行類型判斷時，也是有限的：

```kotlin
fun main() {
    val a: A = C()
    when(a) {
        is B -> println("是B")
        is C -> println("是C")
        is D -> println("是D")
    }
}
```

密封類的應用場景其實遠不止這些，由於篇幅有限，這裡就不展開講解了。

## 異常機制

在理想的情況下，我們的程式會按照我們的思路去執行，按理說是不會出現問題的，但是，程式碼實際編寫後並不一定是完美的，可能會有我們沒有考慮到的情況，如果這些情況能夠正常得到一個錯誤的結果還好，但是如果直接導致程式執行出現問題了呢？

我們來看下面這段程式碼：

```kotlin
fun main() {
    test(1, 0) //當b為0的時候，還能正常執行嗎？
}

private fun test(a: Int, b: Int): Int {
    return a / b //沒有任何的判斷而是直接做計算
}
```

1怎麼可能去除以0呢，數學上有明確規定，0不能做除數，所以這裡得到一個異常：

![image-20231227180433658](https://s2.loli.net/2023/12/27/Za7QPWiNso8nFXE.png)

那麼這個異常到底是什麼樣的一種存在呢？當程式執行出現我們沒有考慮到的情況時，就有可能出現異常或是錯誤！它們在預設情況下會強行終止我們的程式。

### 異常的使用

我們在之前其實已經接觸過一些異常了，比如陣列越界異常，空指標異常，算術異常等，他們其實都是異常類型，我們的每一個異常也是一個類，他們都繼承自`Throwable`類！異常類型本質依然類的物件，但是異常類型支援在程式執行出現問題時拋出（也就是上面出現的紅色報錯）也可以提前宣告，告知使用者需要處理可能會出現的異常！

每個異常物件都包含一條消息、一個堆疊跟蹤和一個可選原因。

我們自己也可以拋出異常，要拋出異常物件，請使用`throw`出表達式：

```kotlin
fun main() {
  	//Exception繼承自Throwable類，作為普通的異常類型
    throw Exception("厲害")
}
```

可以看到，控制台出現了下面的報錯：

![image-20231227180748601](https://s2.loli.net/2023/12/27/XFmHoSbZiL289EY.png)

所以，我們平時看到的那些豐富多彩的異常，其實大部分都是由程式主動拋出的。

我們也可以依葫蘆畫瓢，自訂我們自己的異常類：

```kotlin
class TestException(message: String) : Exception(message)

fun main() {
    throw TestException("自訂異常")
}
```

是不是感覺很簡單，異常的出現就是為了方便我們快速判斷程式的錯誤。我們可以在異常列印出來的堆疊追蹤資訊中得到目前程式出現問題的位置：

![image-20231227181629692](https://s2.loli.net/2023/12/27/GDpitSKX4EFIzoO.png)

這裡指示的很明確，是我們的Main.kt文件第四行程式碼出現了異常。

### 異常的處理

當程式沒有按照我們理想的樣子執行而出現異常時（JVM平台下，預設會交給JVM來處理，JVM發現任何異常都會立即終止程式執行，並在控制台列印堆疊追蹤資訊）現在我們希望能夠自己處理出現的問題，讓程式繼續執行下去，就需要對異常進行捕獲，比如：

```kotlin
val array = arrayOf(1, 2, 3)
println(array[3])   //陣列長度根本沒有4，很明顯這裡會出現異常
```

現在我們希望能夠手動處理這種情況，即使發生異常也要繼續下去，我們可以使用try-catch語句塊來完成：

```kotlin
fun main() {
    try {    //使用try-catch語句進行異常捕獲
        val array = arrayOf(1, 2, 3)
        println(array[3])
    } catch (e: ArrayIndexOutOfBoundsException) {
        //因為異常本身也是一個物件，catch中實際上就是用一個局部變數去接收異常
    }
    println("程式繼續正常執行！")
}
```

我們可以將程式碼編寫到`try`語句塊中，只要是在這個範圍內發生的異常，都可以被捕獲，使用`catch`關鍵字對指定的異常進行捕獲，這裡我們捕獲的是ArrayIndexOutOfBoundsException陣列越界異常：

![image-20231227182739956](https://s2.loli.net/2023/12/27/Qp8L7aRYuBovDfj.png)

可以看到，當我們捕獲異常之後，程式可以繼續正常執行，並不會像之前一樣直接結束掉。

注意，catch中捕獲的類型只能是Throwable的子類，也就是說要嘛是拋出的異常，要嘛是錯誤，不能是其他的任何類型。

我們可以在`catch`語句塊中對捕獲到的異常進行處理：

```kotlin
fun main() {
    try {    //使用try-catch語句進行異常捕獲
        val array = arrayOf(1, 2, 3)
        println(array[3])
    } catch (e: ArrayIndexOutOfBoundsException) {
        e.printStackTrace();   //列印堆疊追蹤資訊
        println("異常錯誤資訊："+e.message);   //獲取異常的錯誤資訊
    }
    println("程式繼續正常執行！")
}
```

![image-20231227182840106](https://s2.loli.net/2023/12/27/39GBhcEr54I8blv.png)

當程式碼可能出現多種類型的異常時，我們希望能夠分不同情況處理不同類型的異常，就可以使用多重異常捕獲：

```kotlin
try {
    //....
} catch (e: Exception) {  //父類型在前，會將子類的也捕獲
  
} catch (e: NullPointerException) {   //因為NullPointerException是Exception的子類型，永遠都不會進入這裡
  
} catch (e: IndexOutOfBoundsException) {   //永遠都不會進入這裡
  
}
```

最後，當我們希望，程式執行時，無論是否出現異常，都會在最後執行任務，可以交給`finally`語句塊來處理：

```kotlin
try {
    //....
} catch (e: Exception) {
    
} finally {
    println("lbwnb") //無論是否出現異常，都會在最後執行
}
```

注意：`try`語句塊至少要配合`catch`或`finally`中的一個。

`try`也可以當做一個表達式使用，這意味著它可以有一個返回值：

```kotlin
fun main() {
    val input = readln()
    val a: Int? = try { input.toInt() } catch (e: NumberFormatException) { null }
    println(a)
}
```

針對於空類型，我們也可以在判斷為空時直接拋出異常：

```kotlin
val s = person.name ?: throw IllegalArgumentException("Name required")
```

至此，有關Kotlin基礎語言部分就全部完結了，後面我們還會繼續講解Kotlin的更多擴展知識，包括Kotlin與Java的互動、Kotlin共常式、Kotlin反射等等，感謝各位小伙伴一直以來的支援。

————————————————
版權聲明：本文為柏碼知識庫版權所有，禁止一切未經授權的轉載、發布、出售等行為，違者將被追究法律責任。
原文連結：https://www.itbaima.cn/document/v1zzvki0knb1xvml