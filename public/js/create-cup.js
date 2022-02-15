async function newPostHandler(event) {
  event.preventDefault();

  const title1 = document.querySelector('.createCup');
  const value1 = title1.options[title1.selectedIndex].value;
  const title2 = document.querySelector('.roast');
  const value2 = title2.options[title2.selectedIndex].value;
  const title3 = document.querySelector('.sweet');
  const value3 = title3.options[title3.selectedIndex].value;
  // console.log(value);

      const response = await fetch(`/api/coffee`, {
          method: 'POST',
          body: JSON.stringify({
          value1,
          value2,
          value3
          }),
          headers: {
          'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          document.location.replace('/dashboard');
      } else {
          alert(response.statusText);
      }
      console.log('woow');

}

document.querySelector('.newPostForm').addEventListener('submit', newPostHandler);

$('.sel').each(function() {
  $(this).children('select').css('display', 'none');
  
  var $current = $(this);
  
  $(this).find('option').each(function(i) {
    if (i == 0) {
      $current.prepend($('<div>', {
        class: $current.attr('class').replace(/sel/g, 'sel__box')
      }));
      
      var placeholder = $(this).text();
      $current.prepend($('<span>', {
        class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
        text: placeholder,
        'data-placeholder': placeholder
      }));
      
      return;
    }
    
    $current.children('div').append($('<span>', {
      class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
      text: $(this).text()
    }));
  });
});

// Toggling the `.active` state on the `.sel`.
$('.sel').click(function() {
  $(this).toggleClass('active');
});

// Toggling the `.selected` state on the options.
$('.sel__box__options').click(function() {
  var txt = $(this).text();
  var index = $(this).index();
  
  $(this).siblings('.sel__box__options').removeClass('selected');
  $(this).addClass('selected');
  
  var $currentSel = $(this).closest('.sel');
  $currentSel.children('.sel__placeholder').text(txt);
  $currentSel.children('select').prop('selectedIndex', index + 1);
});

//create new post function

