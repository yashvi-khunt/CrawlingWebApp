using AutoMapper;
using OAuthLogin.DAL.Models;
using OAuthLogin.DAL.ViewModels;

namespace OAuthLogin.BLL.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile() { 
        
            CreateMap<ApplicationUser, VMGetUsers>().ReverseMap();
            CreateMap<LoginHistory,VMGetLoginHistories>().ReverseMap();
            CreateMap<LoginHistory,VMAddLoginHistory>().ReverseMap();
           
        }
    }
}
