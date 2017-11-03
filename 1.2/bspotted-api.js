
/* global window */


/**
 * Bspotted API
 */

(function () {

  /**
   * Represents a BspottedAPI class used in Bspotted page to parse results from Bspotted webservice.
   * @param {Object} data JSON data received from Bspotted webservice
   */
  function BspottedAPI(data) {
    this.data = data;
    console.log(data);

    /**
     * Returns true if Bspotted response is valid (i.e. contains no errors but valid data).
     * @returns {boolean} true if Bspotted response is valid 
     */
    this.isValidResult = function () {
      return this.data.name && this.data.webpresence_text && this.data.bdigital_text;
    };

    /**
     * Returns company object (basic information about company) initialized from Bspotted API response data.
     * @returns {Object} company object 
     */
    this.getCompany = function () {
      return {
        name: this.data.name,
        street: this.data.street,
        street_number: this.data.street_number,
        postal_code: this.data.postal_code,
        city: this.data.city,
        tel: this.data.tel,
        email: this.data.email,
        rating: this.data.rating,
        web: this.data.website
      };
    };

    /**
     * Returns opening hours object (week days) initialized from Bspotted API response data.
     * @returns {Object} opening hours object 
     */
    this.getOpeningHours = function () {
      var week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      var result = {};

      for (var i = 0; i < week.length; i++) {
        var day = week[i];

        //if %day% is present in Bspotted response, copy it to result
        if (this.data[day]) { result[day] = this.data[day]; }

        //if %day%_c is present in Bspotted response, copy it to result
        if (this.data[day + '_c']) { result[day + '_c'] = this.data[day + '_c']; }
      }

      return result;
    };

    /**
     * Returns social media rank object initialized from Bspotted API response data.
     * @returns {Object} social media rank object 
     */
    this.getSocialMediaRank = function () {
      return {
        socialmedia_presence: this.data.socialmedia_presence,
        review_count: this.data.review_count,
        socialmedia_text: this.data.socialmedia_text,
        socialmedia_presence_h: this.data.socialmedia_presence_h,
        reviews_h: this.data.reviews_h
      };
    };

    /**
     * Returns digital media rank object initialized from Bspotted API response data.
     * @returns {Object} digital media rank object 
     */
    this.getDigitalMediaRank = function () {
      return {
        //determine rank from webservice data (good, medium or bad)
        rank: (+this.data.webpresence_percentage > 50) ? (+this.data.webpresence_percentage > 80 ? 'good' : 'medium') : 'bad',
        webpresence_text: this.data.webpresence_text,
        digital_presence_h: this.data.digital_presence_h
      };
    };

    /**
     * Returns chart data object initialized from Bspotted API response data.
     * @returns {Object} chart data object 
     */
    this.getChart = function () {
      return {
        correct: this.data.correct,
        incorrect: this.data.incorrect,
        missing: this.data.missing
      };
    };

    /**
     * Returns Ballstar product object initialized from Bspotted API response data.
     * @returns {Object} Ballstar product object 
     */
    this.getBallstarProduct = function () {
      return {
        ballstart_text: this.data.ballstart_text,
        ballstart_text_l: this.data.ballstart_text_l,

        //show ribbon on product card if Bspotted has the ranking keyword for this product
        showRibbon: this.data.ballstart_ranking === 'Red' 
      };
    };

    /**
     * Returns Bdigital product object initialized from Bspotted API response data.
     * @returns {Object} Bdigital product object
     */
    this.getBdigitalProduct = function () {
      return {
        bdigital_text: this.data.bdigital_text,
        bdigital_text_l: this.data.bdigital_text_l,

        //show ribbon on product card if Bspotted has the ranking keyword for this product
        showRibbon: this.data.bdigital_ranking === 'Red'
      };
    };

    /**
     * Returns Bsocial product object initialized from Bspotted API response data.
     * @returns {Object} Bsocial product object
     */
    this.getBsocialProduct = function () {
      return {
        bsocial_text: this.data.bsocial_text,
        bsocial_text_l: this.data.bsocial_text_l,

        //show ribbon on product card if Bspotted has the ranking keyword for this product
        showRibbon: this.data.bsocial_ranking === 'Red'
      };
    };
  }

  //bind the API to Window object
  window.BspottedAPI = BspottedAPI;

})();
