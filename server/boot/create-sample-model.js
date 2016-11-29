'use strict';
var async = require('async');

module.exports = function(app) {
  var mysqldb = app.dataSources.mysqldb;

  async.parallel({
    spices: async.apply(createSpices),
    recipes: async.apply(createRecipes),
  }, function(err, results) {
    if (err) throw err;
    createRecipeSpices(results.spices, results.recipes, function(err) {
      console.log('models created sucessfully');
    });
  });

  function createSpices(cb) {
    mysqldb.automigrate('Spice', function(err) {
      if (err) throw err;

      app.models.Spice.create([{
        name: '藏红花',
        cover: 'https://img1.doubanio.com/view/photo/large/public/p2400829937.jpg',
        introduction: 'Saffron, 香料之王，价格比黄金贵，从花中取三个柱头，75000朵花才产出1磅藏红花，是很好的食用香料，欧洲菜式中多搭配海鲜，也可以当天然着色剂使用。因为价格有利可图，市场充斥着爆多的假货。中国西藏有少量栽培，产量不会很大，而且质量不是最好的，七八十元每克是正常价格，如果比这个价格便宜很多，你懂的。伊朗产的藏红花最佳，市场价格200元左右每克。',
      }, {
        name: '香草',
        cover: 'https://img3.doubanio.com/view/photo/photo/public/p2400829923.jpg',
        introduction: 'Vanilla，音译梵尼兰，香料皇后。香气浓郁，多用于甜食。相信大家都有吃过香草蛋糕，香草巧克力，香草雪糕，喝过香草咖啡，奶茶了吧。但是不得不说多数都是用香精做的。除了食用，还可以提炼精油，制作香水，用途很广泛。香草主要产自马达加斯加和墨西哥，马达加斯加占绝大半分的产量。市场价700每公斤左右。听说海南已经有成功栽培，不过产量应该很少，不足以使价格下降，不知道香气如何。表面干燥，香气足够，长度达425px以上为佳。',
      }, {
        name: '绿豆蔻',
        cover: 'https://img3.doubanio.com/view/photo/photo/public/p2400829913.jpg',
        introduction: 'Cardamom。与肉豆蔻完全是不同的，黄绿色的，太绿的就不要买了。很少单独使用，可放入奶茶，咖啡中增香，甚至有客人买来泡茶的。是咖喱粉的原料之一。主要产自印度，危地马拉。价格在400每公斤左右。',
      }, {
        name: '肉豆蔻',
        cover: 'https://img1.doubanio.com/view/photo/photo/public/p2400829917.jpg',
        introduction: '又叫肉果，Nutmeg。产于印度和印尼。颗粒饱满，表面光滑为佳。通常打成粉后使用，可用于烘焙面包，派，甜点等，或者腌制肉类。由于种植和生产需要耗费大量时间，所以价格也不低。国际贸易中，供应商把一级肉豆蔻定义为ABCD级，不过用于打粉是不会用最好的原料的（无论什么企业），所以肉豆蔻粉价格大概在80元每公斤以上。顺便提及肉豆蔻衣，Mace。它是包裹着肉豆蔻的一层“衣”，也是名贵的香料，价格比ABCD级的肉豆蔻贵多了。味道和肉豆蔻差不多。暂时还没有客人买这个东东。',
      }, {
        name: '丁香',
        cover: 'https://img3.doubanio.com/view/photo/photo/public/p2400829903.jpg',
        introduction: 'Clove。产自马达加斯加和印尼。一般使用的是公丁香，也很少单独使用到菜中，可用于打火锅，腌制肉类等，也是咖喱粉的成分之一。对牙痛和口气都有不错的效果。',
      }, {
        name: '多香果',
        cover: 'https://img1.doubanio.com/view/photo/photo/public/p2400829908.jpg',
        introduction: '又叫牙买加胡椒，Allspice。产自牙买加，洪都拉斯，墨西哥等南美国家，因其香气像肉桂，丁香，肉豆蔻的混合，故称多香。用于鱼类，肉类的增香。也可打成粉，用于烘焙甜品，饼干，面包等。',
      }, {
        name: '红胡椒',
        cover: 'https://img1.doubanio.com/view/photo/photo/public/p2400830428.jpg',
        introduction: 'Pinkpepper。有顾客问我粉红胡椒和红胡椒一样吗，其实是一样的，按英文直译就是粉红胡椒，我也不知道为什么不译作Red pepper。产自巴西，它和黑白胡椒不是一个概念的，不是同一棵树的产物。它有清新的松木香气，适合和鱼类，野味搭配，虽然称为胡椒，但却没有黑胡椒那么辛辣。每公斤400元左右。',
      }], cb);
    });
  }

  function createRecipes(cb) {
    mysqldb.automigrate('Recipe', function(err) {
      if (err) throw err;

      app.models.Recipe.create([{
        name: '藏红花桃胶三红羹',
        cover: 'https://img1.doubanio.com/view/photo/photo/public/p2400835678.jpg',
        introduction: '',
      }, {
        name: '柠檬香草戚风 ',
        cover: 'http://s2.cdn.xiachufang.com/6720acde890811e6b87c0242ac110003_2000w_1333h.jpg',
        introduction: '天热了就会各种喜欢气味清新好闻的水果 什么芒果菠萝金桔桃 再过一会儿还会有西瓜哈密瓜荔枝什么的都是我喜欢的 受不了啊  好想吃233 呃 回到戚风正题啦  今天是柠檬和香草混合的戚风 整体小清新哟 加一点微微的奶油 好好吃ԅ(¯﹃¯ԅ)',
      }, {
        name: 'Semla 瑞典奶油豆蔻面包',
        cover: 'http://s1.cdn.xiachufang.com/7bc00306885411e6a9a10242ac110002_640w_640h.jpg@2o_50sh_1pr_1l_620w_90q_1wh',
        introduction: 'Semla是瑞典复活节期间的传统食物，尤其是在fettisdagen肥胖星期二当天一定要吃一个。要知道，Semla绝不仅仅是个带豆蔻香气的小圆面包。明知是肥死人不偿命的卡路里炸弹，却完全无法阻止瑞典人民对她的热爱。有历史记载，某位国王连吃14个Semla浸热牛奶之后，直接挂了。如果你无法独自吃完一个Semla，不用担心，你是绝大多数。所列材料大约能做6个Semla',
      }, {
        name: '豆蔻彩色意面',
        cover: 'http://s2.cdn.xiachufang.com/17f9101088cc11e6a9a10242ac110002_638w_638h.jpg',
        introduction: '今天的天气实在太好了，那就煮份彩色意面吧，^_^当然还有偶爱的“豆蔻”啦～',
      }, {
        name: 'glue wine·荷兰人亲授',
        cover: 'http://s2.cdn.xiachufang.com/b66aa2ac882411e6b87c0242ac110003_650w_650h.jpg?imageView2/2/w/620/interlace/1/q/90',
        introduction: '这款glue wine，是流行于北欧的一款冬季驱寒特饮，教我做的荷兰老头，从我认识他那一年开始，他就和每一位问他年龄的人说“I\'m 59.”……一直至今……o(︶︿︶)o唉…… 如今我们更像是一家人，每1-2个月他都会来中国呆一周，而我们这里俨然已经变成他的第二个家……在他在中国的一个星期里，我们经常分享许多趣事，经验和喜怒哀乐……虽然我们经常有意见不和，但是总得来说……他还是个好人，哈哈哈！至少，他的这款酒，真的不错…… 老头每年都要去瑞士滑雪（真羡慕），介绍说这个酒，他每次滑完雪回来都一定要喝！驱寒暖身，促进血液循环，预防感冒，去除湿气…… 扯远了……好吧！寒冷的冬天，煮一锅glue wine，和三两好友对饮开怀…又可养生…真的是件乐事…… 我今天做的是6-10个人份，分量稍大，如果没有那么多人可以减半…其实煮出来也就两瓶的量…',
      }, {
        name: '牙买加天贝素手卷',
        cover: 'http://s2.cdn.xiachufang.com/025ff598873c11e6a9a10242ac110002_1024w_683h.jpg?imageView2/2/w/620/interlace/1/q/90',
        introduction: '“我最近听到一小部分朋友说他们不喜欢天贝，而他们还无法理解别人为啥会喜欢。好吧，其实我在这里是想告诉大家，我喜欢天贝，说真的，是灰常灰常喜欢的那种。对我而言，吃天贝和吃豆腐一样，都可以让我满心的享受！焯水，微煎，直至金黄色，简单而又令人满足！” “所以我劝这些不喜欢天贝的朋友，何不再去尝试一次呢？那种腌渍后的美妙感觉，制作成松脆的口感，好过软绵的太多。和大多数食物一样，再吃之前，都需要我们去做一些准备工作，让食物变得更美妙！在我看来，一个人如果不知道甜菜或者胡萝卜是啥味道，那真是太可惜了！所以下个决心吧！多去尝试一些好的食物，我们的世界就多一些乐趣！” ',
      }, {
        name: 'GALLO暖心小食——简单的红胡椒配橄榄油',
        cover: 'http://s1.cdn.xiachufang.com/1e1ca67c8b2511e6a9a10242ac110002_310w_310h.jpg@2o_50sh_1pr_1l_620w_90q_1wh',
        introduction: '1、将橄露橄榄油保持在室温下，慢慢加热（如可能）。2、加入红胡椒粒，将部分碾碎后放置约2-3小时，使味道更加强烈。3、用面包片蘇橄露GALLO风味橄榄油后食用。',
      }], cb);
    });
  }

  function createRecipeSpices(spices, recipes, cb) {
    mysqldb.automigrate('SpiceLink', function(err) {
      if (err) throw err;
      app.models.SpiceLink.create([{
        recipeId: recipes[0].id,
        spiceId: spices[0].id,
      }, {
        recipeId: recipes[0].id,
        spiceId: spices[1].id,
      }, {
        recipeId: recipes[2].id,
        spiceId: spices[2].id,
      }, {
        recipeId: recipes[3].id,
        spiceId: spices[3].id,
      }, {
        recipeId: recipes[4].id,
        spiceId: spices[4].id,
      }, {
        recipeId: recipes[5].id,
        spiceId: spices[5].id,
      }, {
        recipeId: recipes[6].id,
        spiceId: spices[6].id,
      }], cb);
    });
  }
};
