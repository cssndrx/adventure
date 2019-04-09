

var specialMonkQuestions = [
{
  // uniform prior
  id: 'uniform-prior',
  question: 'Your quest is more likely to proceed through...',
  answers: ['Ice Mountain', 'Crevasse of Doom'],
  correct: ['Ice Mountain', 'Crevasse of Doom']


// User chooses 0.5. 
// Very good.

// User chooses not 0.5.
// If user chooses not 0.5. Hm, what do you know tha makes you think 
// <X> is more likely? 

// Explanation that shows up regardless.
// Given that you don't know anything about
// these two places, it is equally likely that your quest could proceed 
// through either of them. In this case, it makes sense to choose either
// answer but express your certainy as 50 - 50. This is called a 
// uniform prior. You have no information, so all choices are equal.


// Nothing to win
// Nothing to lose

},


{
  // priors
  // http://www.bbc.com/earth/story/20150827-the-wettest-place-on-earth
  // dang, there's some place where it rains 320 days a year.
  id: 'rain-prior',
  question: 'Will it rain in this town tomorrow?',
  answers: ['Yes', 'No'],
  correct: ['No'],

// User chooses 0.5.

// Ah, you chose 0.5 because you are unsure whether it will rain tomorrow?

// User chooses 'No' with some greater certainty.

// Ah, very wise.

// User chooses 'Yes' with some greater certainty.

// Hm... I don't think that's quite right.

// Explanation that shows up regardless.
// I also don't know whether it will rain tomorrow, 
// but based off our past experiences
// living on earth, there are more sunny days than rainy
// days -- so in this case you have prior knowledge on the frequency
// of sunny days vs rainy days which you can use to inform your decision.

// A calibrated player would answer based on the observed frequency of rain.

// It is also possible to incorporate additional knowledge, like
// whether it rained yesterday, into your probability but that's a topic
// for another day.

// Nothing to win
// Nothing to lose

},
{
  id: 'brenda-question',
  question: 'Which is more likely?',
  answers: ['Brenda is a millenial', 'Brenda is a millenial who spends too much time worrying about what her friends think of her and eats avocado toast'],
  correct: ['Brenda is a millenial']


// User right answer with 100% certainty

// Mm... good. You recognized the Conjuction Fallacy.

// While it is mathematically true that you have selected the right 
// answer, but I personally shy away from being 100% certain about
// anything because it means that you would be willing to give up an
// entire universe of moneybags if wrong, in exchange for a single 
// moneybag if you are right. And who knows, you might have misunderstood
// the question... 

// In this case, you were right though. Here is your 1 moneybag reward.

// User right answer with high certainty

// Mm... very good. You recognized the Conjuction Fallacy.
// Here is your 1 moneybag reward.


// User wrong answer
// Ah, not quite... 

// User right answer with low certainty
// Hm, your answer is correct but why aren't you more certain? 


// The chance that Brenda is a millenial AND something else is true,
// is always lower than the chane that Brenda is a millenial.

// This is known as the https://en.wikipedia.org/wiki/Conjunction_fallacy
// where sometimes our brains get tricked into pattern matching, 
// but if you think about the actual probabilistic events the answer
// is clear. Take a look at the most famous example, the Linda Problem.

},

{
  id: 'linda-question',
  question: 'Linda is 31 years old, single, outspoken, and very bright. She majored in philosophy. As a student, she was deeply concerned with issues of discrimination and social justice, and also participated in anti-nuclear demonstrations. Which is more likely?',
  answers: ['Linda is a bank teller', 'Linda is a bank teller and is active in the feminist movement.'],
  correct: ['Linda is a bank teller']
}

// Adding a special question requires adding an explanation in the
// special-monk-interaction temlate.

];


// standard questions

// https://www.urmc.rochester.edu/encyclopedia/content.aspx?contenttypeid=1&contentid=1169
var basicMonkQuestions = [{
  question: 'Which of the following compounds can be used to kill bedbugs?',
  answers: ['Ginseng', 'Diatomaceous earth'],
  correct: ['Diatomaceous earth']
},

{
  question: 'Which of the following is used as a tea for reducing anxiety?',
  answers: ['Tulsi', 'Gingko'],
  correct: ['Tulsi'],
},

{
  question: 'Which of the following has antimicrobial properties?',
  answers: ['Garlic', 'Bull thistle'],
  correct: ['Garlic']
},

{
  question: 'Which of the following is older?',
  answers: ['Etruscan Gold Book', 'Madrid Codex'],
  correct: ['Etruscan Gold Book'],
  images: ['etruscan_gold_book.jpg', 'madrid_codex.jpg']
},

{
  question: 'Which of these plants is edible?',
  answers: ['Cat tail', 'Angel\'s Trumpet'],
  correct: ['Cat tail'],
  images: [],
  extra: ['The root of cat tail is edible']
}, 

// https://www.foodandwine.com/fwx/slideshow/wild-berries-you-can-eat-without-dying#saskatoon-berries
{
  question: 'Which of these berries is poisonous?',
  answers: ['Poke weed', 'Dew berries'],
  correct: ['Poke weed'],
  images: [],
}, 


// stopped here: adding more questions -- will people be bored of these herbalism questions?
// just generate more questions and play test


/*

How many published books?
130 million

https://wiganlanebooks.co.uk/blog/interesting/10-of-the-oldest-known-surviving-books-in-the-world/
Which book is older?
Etruscan Gold Book *
Madrid Codex


edible plants list
https://matteroftrust.org/14760/62-edible-wild-plants-that-you-didnt-know-you-can-eat

poisonous plant list
https://www.backpacker.com/skills/12-deadly-plants-you-should-never-eat

should the herbalism ones use pictures instead of words?


todo: pull out herbalism book
which plant is used for X ? 


speed of animals
https://www.conservationinstitute.org/10-fastest-animals-on-earth/

stopped here: adding visual plant questions

*/

];


//basicMonkQuestions = [];
//specialMonkQuestions = [specialMonkQuestions[2]];

var monkQuestions = (function(){
  // Add type attribute to all datums.
  basicMonkQuestions.forEach(d => d['type'] = 'basic');
  specialMonkQuestions.forEach(d => d['type'] = 'special');
  return _.concat(basicMonkQuestions, specialMonkQuestions);
})();


Vue.component('fair-bet-viz', {
  props: {
    certainty: { type: Number, default: 0.5 },
  },
  computed: {
    numTimesRightOutOf10: function(){
      return Math.round(this.certainty * 10);
    },
    numLoseIfWrong: function(){
      const params = this.$root.paramsFromCertainty(this.certainty);
      return params.numLoseIfWrong;      
    },
    fulcrumStyle: function(){
      return {height: lerp(this.certainty, 0.5, 1.0, 200, 400) + 'px'};
    },
  },
  methods: {
    wobble: function(){
      this.$refs['fulcrum'].wobble(1);      
    }
  },
  template: '#fair-bet-viz-template'
});


Vue.component('monk-dual-quiz', {
  props: {
    certainties: {
      type: Array, 
      default: function(){
        return [0.5, 0.67, 0.8, 0.9, 0.99];
      },
    },
  },
  data: function(){
    return {
      activeInd: 0,
      isEndGame: false,
      
      monkAnswer: null,
      isMonkThinking: false,
      params: null,
    }
  },

  watch: {
    activeInd: function(){
      this.$root.play('swish');
    },
  },

  methods: {
    betSubmit: function(params){
      this.params = params;
      this.isMonkThinking = true;
    },
    showAnswer: async function(){
      var params = this.params;
      // check if the number of moneybags is correct
      const certainty = this.certainties[this.activeInd];
      const user_answer = params.numLoseIfWrong;
      const correct_answer = Math.round(this.$root.paramsFromCertainty(certainty).numLoseIfWrong); 

      const user_correctness = user_answer == correct_answer;

      this.isMonkThinking = false;
      this.monkAnswer = user_correctness ? 'Correct': 'Try again';

      // const sound = user_correctness ? 'swish' : 'incorrect';
      // this.$root.play(sound);

      if (user_correctness === true){
        await wait(1000);
        this.activeInd++;
        this.monkAnswer = null;

        if (this.activeInd >= this.certainties.length){
          this.isEndGame = true;
        }          
      } else {
        this.$root.play('incorrect');
      }
    },
    leftWobble: async function(){
      await this.$refs['fulcrum'].leftWobble();
    },
    rightWobble: async function(){
      await this.$refs['fulcrum'].rightWobble();
    },
  },
  template: '#monk-dual-quiz-template',  
});


Vue.component('monk-intro', {
  data: function(){
    return {
      hyderabadCertainty: null,
      hyderabadBetParams: null,
    };
  },
  computed: {
    hyderabadCertaintyParams: function(){
      return this.$root.paramsFromCertainty(this.hyderabadCertainty);
    },

    isUserCalibrated: function(){
      if (this.hyderabadCertainty === null || this.hyderabadBetParams === null){
        return null;
      }

      var floatLoseMoneybags = this.hyderabadCertaintyParams.numLoseIfWrong;
      var intLoseMoneybags = this.hyderabadBetParams.numLoseIfWrong;

      return Math.round(floatLoseMoneybags) === intLoseMoneybags;
    },

    fairBetVizCertainty: function(){
      return this.hyderabadCertainty == 0.5 ? 0.8 : this.hyderabadCertainty;
    }
  },
  methods: {
    hyderabadCertaintySubmit: function(params){
      this.hyderabadCertainty = params.certainty;
      this.show('monk-hyderabad-bet');
    },
    hyderabadBetSubmit: function(params){
      this.hyderabadBetParams = params;
      this.show('monk-hyderabad-dual');
    },
    show: show, 
  },
  template: '#monk-intro-template',
});

Vue.component('monk-game', {
  props: {
    numMoneybagsNeeded: {type: Number, default: 10},
    monkQuestions: {type: Array, default: () => monkQuestions},
  },
  data: function(){
    return {
      questionInd: 0, // index of the active question
      numUserMoneybags: 0,

      gameOutcome: null, // 'userWon', 'monkOutOfQuestions'
      userWantsToProceedPoor: null,
      isGameComplete: false,
    };
  },
  computed: {
    // todo curiosity: when does computed trigger?
    visibleQuestions: function(){
      // Return slice from [0, questionInd] inclusive.
      // Slice is safe from array out of bounds errors.
      return this.monkQuestions.slice(0, this.questionInd+1);
    },
  },
  watch: {
    visibleQuestions: scrollWindow,
    gameOutcome: scrollWindow
  },
  methods: {
    show: show,
    onQuestionComplete: function(params){
      this.numUserMoneybags += params.numMoneybagsGained;

      if (this.numUserMoneybags == this.numMoneybagsNeeded){
        // todo: trigger game end
        this.gameOutcome = 'userWon';        
      } else if (this.questionInd == this.monkQuestions.length){
        // todo: trigger game end
        this.gameOutcome = 'monkOutOfQuestions';
      } else {
        this.questionInd++;        
      }
    },
    completeGame: function(){
      this.$emit('monk-game-complete'); // todo: just call this.$root.show on the next elt.
    }
  },
  template: '#monk-game-template'
});


Vue.component('fulcrum', {
  props: {
    width: {type: Number, default: 400},
    certainty: {type: Number, default: null},
  },

  data: function(){
    return {
      numLeftRows: 0, 
      numRightRows: 0, 
      shouldLeftWobble: false,
      shouldRightWobble: false,

      animationTime: 500,
      betweenAnimationTime: 200,
    };
  },
  computed: {
    percent: function(){
      if (!this.certainty){
        return '';
      }
      const params = this.$root.paramsFromCertainty(this.certainty);
      return params.percent;
    },
    fulcrumStyle: function(){
      const certainty = this.certainty || 0.5;
      return {left: (this.width*certainty - 50) + 'px'};
    }
  },
  methods: {
    wobble: async function(num_times){
      for (var i=0; i<num_times; i++){
        await this.leftWobble();
        await this.rightWobble();
      }
    },
    leftWobble: async function(){
      this.shouldLeftWobble = true;        
      await wait(this.animationTime);
      this.shouldLeftWobble = false;
      await wait(this.betweenAnimationTime);      
    },

    rightWobble: async function(){
      this.shouldRightWobble = true;        
      await wait(this.animationTime);
      this.shouldRightWobble = false;
      await wait(this.betweenAnimationTime);      
    }
  },

  template: '#fulcrum-template'
});


Vue.component('money-bags', {
  props: {
    color: {type: String, default: 'brown'},
    number: {type: Number, default: 1},
    width: {type: Number, default: 20},
    isHorizontal: {type: Boolean, default: true},
  },
  computed:{
    // e.g. 0.3, if numLoseIfWrong == 2.3.
    positiveFraction: function(){
      return this.number - Math.floor(this.number);
    },

    // {width: '10px', height:'30px', top:'-4px'}
    fractionalCoverStyle: function(){
      // compute the styling of a white square that is aligned right
      // which creates the illusion of the fractional moneybag.
      const fudge = 4;
      return {
        width: (1-this.positiveFraction) * this.width + 'px',
        height: this.width * 236/200 + fudge + 'px',
      };
    },
  },
  template: '#money-bags-template'
});

Vue.component('moneybag-widget', {
  props: {
    numWinIfRight: {type: Number, default: 1},
    numLoseIfWrong: {type: Number, default: 1},
    showCertainty: {type: Boolean, default: true}, // currently unused
    showInstructions: {type: Boolean, default: true},
    isInteractive: {type: Boolean, default: false},
  },
  computed:{
    percent: function(){
      var params = this.$root.paramsFromBet(this.numWinIfRight, this.numLosingMoneybags);
      return params.percent;
    },
    numLosingMoneybags: function(){
      return this.isInteractive ? this.numInteractiveBags : this.numLoseIfWrong;
    }
  },

  data: function(){
    return {
      relativeMousePos: null,
      numInteractiveBags: 0, // starting default
    }
  },

  methods: {
    getRelativeMousePos: function(event){
      // https://stackoverflow.com/questions/5921413/difference-between-e-target-and-e-currenttarget
      // e.target is what triggers the event dispatcher to trigger and e.currentTarget is what you assigned your listener to.

      // Find the 'dist' element to compute relative mouse coords.
      var refElement = event.target;
      while (refElement.className !== 'ref-element'){
        refElement = refElement.parentElement;
      }
      return {x: event.clientX - refElement.getBoundingClientRect().x,
            y: event.clientY - refElement.getBoundingClientRect().y};
    },

    onDrag: function($event){
      console.log('on drag: '+ $event.clientX + ' ' + $event.clientY);
      if ($event.clientX === 0 && $event.clientY === 0){
        // For some reason, on dragdrop clientX/clientY === 0. 
        // Discard this event.
        return;
      }
      this.relativeMousePos = this.getRelativeMousePos($event);
      numBagsInX = Math.max(1, Math.ceil(this.relativeMousePos.x / this.moneybagWidth));
      numBagsInY = Math.max(0, Math.floor(this.relativeMousePos.y / (this.moneybagWidth *(35/30)))); 
      this.numInteractiveBags = numBagsInX + numBagsInY * 10;
    },

    submitBet: function(){
      // emit the event
      this.$root.play('heal');
      this.$emit('bet-submit', this.$root.paramsFromBet(this.numWinIfRight, this.numLosingMoneybags));
    },

    lessClick: function(){
      this.numInteractiveBags = Math.max(0, this.numInteractiveBags-1); 
      this.$root.play('remove0');
      this.$emit('less-money');
    },

    moreClick: function(){
      this.numInteractiveBags+=1; 
      this.$root.play('gold'); 
      this.$emit('more-money');
    }
  },
  template: '#moneybag-widget-template'
});

// static moneybag widget: renders 1:4 statically
// interactive moneybag widget: reports back the number of moneybags (inits with 1:1)


Vue.component('monk-head', {
  methods: {
    hasSlot: function(name){
      return !!this.$slots[ name ] || !!this.$scopedSlots[ name ];
    }
  },
  template: '#monk-head-template'
});

Vue.component('monk-question', {
  props: {
    // question: 'Which of the following is older?',
    // answers: ['Etruscan Gold Book', 'Madrid Codex'],
    // correct: ['Etruscan Gold Book'],
    // images: ['etruscan_gold_book.jpg', 'madrid_codex.jpg']
    // extra: ['Blah blah']
    datum: {type: Object},
    vizType: {type: String, default: 'certainty'}, // 'bet', 'certainty'

    // Give the monk something to say in a speech bubble.
    monkSays: {type: String, default: null},
  },

  data: function(){
    return {
      userAnswer: null, 
      params: null,
      showThinkingBubble: false,
    }
  },

  watch: {
    userAnswer: scrollWindow,
  },

  methods: {
    // e.g. Hyderabad, Islamabad
    userChoseAnswer: function(answer){
      this.userAnswer = answer;
    },

    onBetSubmit: function(params){
      params['userAnswer'] = this.userAnswer;
      this.params = params;
      this.showThinkingBubble = true;
    },

    onThinkingComplete: function(){
      this.$emit('answer-complete', this.params);      
    }

  },
  template: '#monk-question-template'
});

Vue.component('basic-monk-interaction', {
  props: {
    // question: 'Which of the following is older?',
    // answers: ['Etruscan Gold Book', 'Madrid Codex'],
    // correct: ['Etruscan Gold Book'],
    // images: ['etruscan_gold_book.jpg', 'madrid_codex.jpg']
    // extra: ['Blah blah']
    datum: {type: Object},
    vizType: {type: String, default: 'certainty'}, // 'bet', 'certainty'
  },

  data: function(){
    return {
      userAnswer: null,     // e.g. Hyderabad, Islamabad
      userCertainty: null,
      isMonkDoneThinking: false,
      isMonkBetting: null,  
      numMoneybagsGained: null,   

      numLoseIfWrong: null, 
    }
  },

  computed: {
    isUserCorrect: function(){
      return _.includes(this.datum.correct, this.userAnswer);
    },

    percent: function(){
      return this.$root.renderAsPercent(this.userCertainty);
    },    
    monkSays: function(){
      if (this.isMonkBetting === null){
        return null;
      }
      if (this.isMonkBetting === false){
        return 'Eh';
      }
      return this.isUserCorrect ? 'Correct' : 'Incorrect';
    }
  },
  methods: {

    // params = {userAnswer: certainty: numWinIfRight: numLoseIfWrong: }
    onAnswerComplete: function(params){
      this.userAnswer = params.userAnswer;
      this.userCertainty = params.certainty;

      this.isMonkBetting = this.willMonkBet(params.certainty);

      if (this.isMonkBetting){

        this.numLoseIfWrong = params.numLoseIfWrong;

        // edit to handle cases of multiple correct answers
        if (this.isUserCorrect){
          this.numMoneybagsGained = params.numWinIfRight; 
        } else {
          this.numMoneybagsGained = -params.numLoseIfWrong; 
        }
      } else{
        this.numMoneybagsGained = 0;
      }

      this.isMonkDoneThinking = true;
    },

    willMonkBet: function(certainty){
      if (certainty > 0.6){
        return true;
      }
      
      var p = {
        0.6: 0.8,
        0.5: 0.5
      }[certainty];
      return Math.random() < p;
    },

    monkReactionComplete: function(){
      var this_ = this;
      setTimeout(function(){
        this_.$emit('question-complete', {
          // may need to pass in other info ??
          numMoneybagsGained: this_.numMoneybagsGained
        });      
      }, 1000);
    }
  },
  template: '#basic-monk-interaction-template'
});


Vue.component('special-monk-interaction', {
  props: {
    // question: 'Which of the following is older?',
    // answers: ['Etruscan Gold Book', 'Madrid Codex'],
    // correct: ['Etruscan Gold Book'],
    // images: ['etruscan_gold_book.jpg', 'madrid_codex.jpg']
    // extra: ['Blah blah']
    datum: {type: Object},
    vizType: {type: String, default: 'certainty'}, // 'bet', 'certainty'
  },

  data: function(){
    return {
      userAnswer: null, // e.g. Hyderabad, Islamabad
      userCertainty: null,

      numMoneybagsGained: 0, // special interactions gain/lose 0 bags by default.   
      // numLoseIfWrong: null, 

      showExplanation: false,
    }
  },

  computed: {
    isUserCorrect: function(){
      return _.includes(this.datum.correct, this.userAnswer);
    },

    percent: function(){
      return this.$root.renderAsPercent(this.userCertainty);
    },    
  },
  methods: {

    // params = {userAnswer: certainty: numWinIfRight: numLoseIfWrong: }
    onAnswerComplete: function(params){
      this.userAnswer = params.userAnswer;
      this.userCertainty = params.certainty;

      this.showExplanation = true;
      // this.numLoseIfWrong = params.numLoseIfWrong;

      // // edit to handle cases of multiple correct answers
      // if (this.isUserCorrect){
      //   this.numMoneybagsGained = params.numWinIfRight; 
      // } else {
      //   this.numMoneybagsGained = -params.numLoseIfWrong; 
      // }
    },

    emitQuestionComplete: function(){
      var this_ = this;
      console.log('hit in child');
      setTimeout(function(){
        console.log(' emitting: ' + this_.numMoneybagsGained);
        this_.$emit('question-complete', {
          // may need to pass in other info ??
          numMoneybagsGained: this_.numMoneybagsGained
        });      
      }, 1000);
    }
  },
  template: '#special-monk-interaction-template'
});


Vue.component('certainty-widget', {
  props: {
    certainties: {
      type: Array, 
      default: function(){
        return [0.5, 0.6, 0.7, 0.8, 0.9];
      },
    },
    showMoneybagWidget: {type: Boolean, default: true},
  },
  data: function(){
    return {
      hoveredCertainty: null,
    };
  },
  methods: {
    submitCertainty: function(certainty){
//      var certainty = params.answer;
      this.$emit('bet-submit', 
        this.$root.paramsFromCertainty(certainty)
      );
    },
    onHover: function(certainty){
      if (this.showMoneybagWidget) { 
        this.hoveredCertainty = certainty;
      }
    },
  },
  template: '#certainty-widget-template'
});
