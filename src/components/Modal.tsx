interface ModalProps {
  isOpen: boolean;
  icon: string;  
  message: string;
  onOkClick?: () => void;
  onCancelClick?: () => void;
}

const Modal = ({ isOpen, icon, message, onOkClick, onCancelClick }: ModalProps) => {

  let title = '';  
  switch (icon) {
    case 'question': title = 'Question';       
        break;
    case 'process': title = '';       
        break;        
    case 'info': title = 'Information';       
        break;
    case 'success': title = 'Success';
        break;        
    case 'error': title = 'Error';       
        break;          
    default: title = 'Warning';
        break;
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">          
          <div className="dialog bg-blue-200 text-black rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <h2 className="text-lg font-bold">{title}</h2>
            </div>
            <div className="flex items-center">
              {
                icon === 'question' ? 
                <>
                    <svg className="w-8 h-8 mr-2" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M256,8C114.616,8,0,97.542,0,208c0,101.994,97.718,186.15,224,198.453C242.667,468.266,256,504,256,504l90.802-108.962 C443.36,366.413,512,293.475,512,208C512,97.542,397.384,8,256,8z M429.922,290.738c-23.406,26.024-57.77,46.722-96.763,58.282 l-13.93,4.13l-9.301,11.162l-35.574,42.688c-1.43-4.632-2.899-9.438-4.403-14.422l-9.296-30.778l-32-3.118 c-51.493-5.016-98.488-24.15-132.331-53.88C65.162,277.426,48,243.046,48,208c0-38.325,20.077-75.115,56.531-103.597 c19.15-14.96,41.653-26.773,66.882-35.109C198.107,60.472,226.566,56,256,56s57.893,4.472,84.586,13.294 c25.23,8.336,47.733,20.15,66.883,35.109C443.923,132.885,464,169.675,464,208C464,237.342,452.216,265.954,429.922,290.738z"/></g></g><g><g><path d="M316.597,129.962c-4.05-8.101-9.347-14.646-15.891-19.629c-6.542-4.986-13.864-8.618-21.966-10.904 C270.64,97.144,262.643,96,254.757,96c-14.957,0-28.25,3.533-39.878,10.594c-11.634,7.066-20.149,16.931-25.547,29.597 l37.698,26.79c1.243-1.45,2.541-3.269,3.893-5.451c1.35-2.178,3.01-4.307,4.986-6.386c1.971-2.074,4.307-3.84,7.01-5.298 c2.698-1.451,5.917-2.179,9.658-2.179c4.986,0,9.344,1.403,13.082,4.206c3.741,2.803,5.613,6.594,5.613,11.371 c0,4.36-1.56,8.362-4.674,11.99c-3.115,3.638-6.806,6.91-11.061,9.819c-4.259,2.907-8.517,5.4-12.771,7.474 c-4.259,2.08-7.531,3.739-9.814,4.986c-5.608,2.909-10.077,6.128-13.397,9.658c-3.325,3.534-5.816,7.219-7.477,11.059 c-1.664,3.846-2.702,7.896-3.115,12.15c-0.418,4.259-0.624,8.566-0.624,12.928h48.288c0-3.32,1.294-6.229,3.896-8.72 c2.594-2.493,5.92-4.878,9.968-7.168c4.05-2.282,8.461-4.563,13.24-6.851c4.776-2.285,9.446-4.986,14.019-8.101 c9.349-6.232,15.835-13.445,19.47-21.65c3.632-8.203,5.453-17.291,5.453-27.262C322.67,147.928,320.648,138.061,316.597,129.962z" /></g></g><g><g><rect x="209.264" y="268.912" width="48.288" height="51.093"/></g></g></svg>                
                </> : 
                icon === 'process' ? 
                <>
                    <svg className="w-8 h-8 text-black mr-2" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M480,192L480,192l-42.965,0c-2.24-6.304-4.853-12.565-7.797-18.72l30.421-30.421c6.037-6.037,9.376-14.08,9.376-22.635 c0-8.555-3.328-16.587-9.376-22.624L414.4,52.352c-12.491-12.491-32.789-12.469-45.259,0L338.72,82.773 c-6.144-2.955-12.405-5.557-18.72-7.808V32c0-17.643-14.357-32-32-32h-64c-17.643,0-32,14.357-32,32v42.965 c-6.315,2.24-12.576,4.853-18.72,7.797l-30.421-30.421c-12.491-12.491-32.789-12.469-45.259,0L52.352,97.6 c-6.037,6.048-9.376,14.08-9.376,22.635s3.328,16.587,9.376,22.635l30.421,30.421c-2.955,6.144-5.568,12.405-7.808,18.709H32 c-17.643,0-32,14.357-32,32v64c0,17.643,14.357,32,32,32h42.965c2.24,6.304,4.853,12.565,7.797,18.72l-30.421,30.421 c-6.037,6.037-9.376,14.08-9.376,22.635s3.328,16.587,9.376,22.624l45.248,45.259c12.491,12.491,32.789,12.469,45.259,0 l30.421-30.421c6.144,2.944,12.405,5.557,18.72,7.797V480c0,17.643,14.357,32,32,32h64c17.643,0,32-14.357,32-32v-42.965 c6.315-2.24,12.576-4.853,18.72-7.797l30.421,30.421c12.491,12.491,32.789,12.469,45.259,0l45.248-45.248 c6.037-6.048,9.376-14.08,9.376-22.635s-3.328-16.587-9.376-22.635l-30.421-30.421c2.944-6.155,5.557-12.416,7.797-18.72H480 c17.643,0,32-14.357,32-32v-64C512,206.357,497.643,192,480,192z M490.667,288c0,5.877-4.779,10.667-10.667,10.667h-50.667 c-4.683,0-8.821,3.061-10.197,7.531c-3.083,10.016-7.232,19.989-12.331,29.611c-2.187,4.139-1.429,9.227,1.888,12.533 l35.872,35.872c2.005,2.016,3.125,4.693,3.125,7.552s-1.109,5.525-3.125,7.541l-45.248,45.259c-4.171,4.171-10.923,4.16-15.093,0 l-35.872-35.872c-3.317-3.317-8.416-4.064-12.544-1.877c-9.589,5.099-19.552,9.237-29.6,12.331 c-4.491,1.365-7.541,5.504-7.541,10.187V480c0,5.877-4.779,10.667-10.667,10.667h-64c-5.888,0-10.667-4.789-10.667-10.667v-50.667 c0-4.683-3.051-8.821-7.531-10.197c-10.048-3.093-20.011-7.232-29.6-12.331c-1.568-0.843-3.296-1.248-5.003-1.248 c-2.763,0-5.493,1.077-7.541,3.125l-35.872,35.872c-4.16,4.149-10.912,4.16-15.093,0l-45.248-45.259 c-2.016-2.005-3.125-4.683-3.125-7.541c0-2.859,1.109-5.536,3.125-7.552l35.872-35.872c3.317-3.317,4.075-8.395,1.888-12.533 c-5.109-9.632-9.248-19.595-12.331-29.611c-1.387-4.459-5.525-7.52-10.208-7.52H32c-5.888,0-10.667-4.789-10.667-10.667v-64 c0-5.877,4.779-10.667,10.667-10.667h50.667c4.683,0,8.821-3.061,10.197-7.531c3.083-10.016,7.232-19.989,12.331-29.611 c2.187-4.139,1.429-9.227-1.888-12.533l-35.872-35.872c-2.005-2.016-3.125-4.693-3.125-7.552c0-2.859,1.109-5.525,3.125-7.541 l45.248-45.259c4.192-4.16,10.944-4.139,15.093,0l35.872,35.872c3.328,3.328,8.437,4.075,12.544,1.877 c9.589-5.099,19.552-9.237,29.6-12.331c4.491-1.365,7.541-5.504,7.541-10.187V32c0-5.877,4.779-10.667,10.667-10.667h64 c5.888,0,10.667,4.789,10.667,10.667v50.667c0,4.683,3.051,8.821,7.531,10.197c10.048,3.093,20.011,7.232,29.6,12.331 c4.128,2.197,9.216,1.44,12.544-1.877l35.872-35.872c4.16-4.149,10.912-4.171,15.093,0l45.248,45.259 c2.016,2.005,3.125,4.683,3.125,7.541c0,2.859-1.109,5.536-3.125,7.552l-35.872,35.872c-3.317,3.317-4.075,8.395-1.888,12.533 c5.109,9.632,9.248,19.595,12.331,29.611c1.387,4.459,5.525,7.52,10.208,7.52H480c5.888,0,10.667,4.789,10.667,10.667V288z"/></g></g><g><g><path d="M316.875,301.792l-53.323-53.323c-0.981-0.992-2.165-1.771-3.477-2.315c-1.301-0.533-2.688-0.821-4.075-0.821h-85.333 c-5.899,0-10.667,4.779-10.667,10.667s4.768,10.667,10.667,10.667h80.917l50.208,50.208c2.08,2.08,4.811,3.125,7.541,3.125 c2.731,0,5.461-1.045,7.541-3.125C321.045,312.704,321.045,305.963,316.875,301.792z"/></g></g><g><g><path d="M256,117.333c-5.899,0-10.667,4.779-10.667,10.667c0,5.888,4.768,10.667,10.667,10.667 c64.693,0,117.333,52.64,117.333,117.333c0,31.403-12.192,60.885-34.315,83.019c-22.123,22.123-51.616,34.315-83.019,34.315 c-64.693,0-117.333-52.64-117.333-117.333c0-5.888-4.768-10.667-10.667-10.667s-10.667,4.779-10.667,10.667 c0,76.459,62.208,138.667,138.667,138.667c37.109,0,71.947-14.411,98.101-40.565s40.565-61.003,40.565-98.101 C394.667,179.541,332.459,117.333,256,117.333z"/></g></g><g><g><path d="M256,160h-32c-5.899,0-10.667,4.779-10.667,10.667s4.768,10.667,10.667,10.667h21.333v32 c0,5.888,4.768,10.667,10.667,10.667c5.899,0,10.667-4.779,10.667-10.667v-42.667C266.667,164.779,261.899,160,256,160z"/></g></g><g><g><path d="M181.333,160H160c-5.899,0-10.667,4.779-10.667,10.667s4.768,10.667,10.667,10.667h21.333 c5.899,0,10.667-4.779,10.667-10.667S187.232,160,181.333,160z"/></g></g><g><g><path d="M181.333,202.667h-42.667c-5.899,0-10.667,4.779-10.667,10.667S132.768,224,138.667,224h42.667 c5.899,0,10.667-4.779,10.667-10.667S187.232,202.667,181.333,202.667z"/></g></g></svg>              
                </> :                
                icon === 'info' ? 
                <>
                    <svg className="w-8 h-8 mr-2" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#BFDCFF;" d="M0,256c0,141.384,114.615,256,256,256l22.261-256L256,0C114.615,0,0,114.616,0,256z"/><path style="fill:#8BC0FF;" d="M256,0v512c141.385,0,256-114.616,256-256S397.385,0,256,0z"/><path style="fill:#3897FF;" d="M44.522,256c0,116.61,94.868,211.478,211.478,211.478L278.261,256L256,44.522 C139.39,44.522,44.522,139.39,44.522,256z"/><path style="fill:#2D79CC;" d="M256,44.522v422.957c116.61,0,211.478-94.868,211.478-211.478S372.61,44.522,256,44.522z"/><path style="fill:#FFFFFF;" d="M222.609,144.696c0,18.442,14.949,33.391,33.391,33.391l11.13-33.391L256,111.304 C237.558,111.304,222.609,126.254,222.609,144.696z"/><path style="fill:#BFDCFF;" d="M256,111.304v66.783c18.442,0,33.391-14.949,33.391-33.391S274.442,111.304,256,111.304z"/><polygon style="fill:#FFFFFF;" points="222.609,222.609 222.609,400.696 256,400.696 267.13,311.652 256,222.609 "/><rect x="256" y="222.609" style="fill:#BFDCFF;" width="33.391" height="178.087"/></svg>                
                </> : 
                icon === 'success' ? 
                <>
                    <svg className="w-8 h-8 mr-2" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><circle style="fill:#25AE88;" cx="25" cy="25" r="25"/><polyline style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" points=" 38,15 22,33 12,25 "/></svg>                
                </> : 
                icon === 'error' ? 
                <>
                    <svg className="w-8 h-8 mr-2" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><circle style="fill:#D75A4A;" cx="25" cy="25" r="25"/><polyline style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;" points="16,34 25,25 34,16 "/><polyline style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;" points="16,16 25,25 34,34 "/></svg>
                </> : 
                <>
                    <svg className="w-8 h-8 mr-2" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#495A79;" d="M501.461,383.799L320.501,51.401C306.7,28.6,282.7,14.8,256,14.8s-50.7,13.8-64.501,36.601 L10.539,383.799C-3.259,407.501-3.56,435.701,9.941,459.4c13.499,23.699,37.798,37.8,65.099,37.8h361.92 c27.301,0,51.601-14.101,65.099-37.8C515.56,435.701,515.259,407.501,501.461,383.799z"/><path style="fill:#42516D;" d="M502.059,459.4c-13.499,23.699-37.798,37.8-65.099,37.8H256V14.8c26.7,0,50.7,13.801,64.501,36.601 L501.461,383.8C515.259,407.501,515.56,435.701,502.059,459.4z"/><path style="fill:#FFDE33;" d="M475.661,399.1L294.699,66.699C286.601,52.9,271.901,44.8,256,44.8s-30.601,8.101-38.699,21.899 L36.339,399.1c-8.399,14.101-8.399,31.199-0.298,45.3c8.099,14.399,22.798,22.8,39,22.8h361.92c16.201,0,30.901-8.401,39-22.8 C484.06,430.299,484.06,413.201,475.661,399.1z"/><path style="fill:#FFBC33;" d="M475.96,444.4c-8.099,14.399-22.798,22.8-39,22.8H256V44.8c15.901,0,30.601,8.101,38.699,21.899 L475.661,399.1C484.06,413.201,484.06,430.299,475.96,444.4z"/><g><path style="fill:#495A79;" d="M256,437.2c-16.538,0-30-13.462-30-30s13.462-30,30-30s30,13.462,30,30S272.538,437.2,256,437.2z"/><path style="fill:#495A79;" d="M286,317.2c0,16.538-13.462,30-30,30s-30-13.462-30-30v-150c0-16.538,13.462-30,30-30 s30,13.462,30,30V317.2z"/></g><g><path style="fill:#42516D;" d="M286,407.2c0-16.538-13.462-30-30-30v60C272.538,437.2,286,423.738,286,407.2z"/><path style="fill:#42516D;" d="M286,317.2v-150c0-16.538-13.462-30-30-30v210C272.538,347.2,286,333.738,286,317.2z"/></g></svg>
                </>                
              }
               <ul>
               {message.split('|').map((elem, index) => (
                 <li key={index}>{elem}</li>
               ))}
               </ul>              
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              {
                onCancelClick && 
                <>
                    <button className="btn bg-red-200 hover:bg-red-400 text-black px-3 py-2 text-sm" onClick={onCancelClick}>
                        Cancel
                    </button>
                </>
              }              
              {
                onOkClick &&
                <>
                    <button className="btn bg-green-200 hover:bg-green-400 text-black px-3 py-2 text-sm" onClick={onOkClick}>
                        OK
                    </button>                
                </>
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;