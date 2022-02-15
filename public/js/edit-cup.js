/* ===== Logic for creating fake Select Boxes ===== */
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
  
  
  //update post function
  async function updateFormHandler(event) {
      event.preventDefault();
    
      const title = document.querySelector('#select-profession');
      const value = title.options[title.selectedIndex].value;
      console.log(value);
      // const text = document.querySelector('#updateText').value.trim();
      const id = window.location.toString().split('/')[
          window.location.toString().split('/').length - 1
        ];
  
      const response = await fetch(`/api/coffee/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
              value
          }),
          headers: {
              'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          document.location.replace('/dashboard/');
        } else {
          alert(response.statusText);
        }
    
  }
  
  document.querySelector('.updateForm').addEventListener('submit', updateFormHandler);
  
  