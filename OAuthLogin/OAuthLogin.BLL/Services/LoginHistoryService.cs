using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using OAuthLogin.BLL.Repositories;
using OAuthLogin.BLL.SQLRepository;
using OAuthLogin.DAL.Models;
using OAuthLogin.DAL.ViewModels;
using StoredProcedure = OAuthLogin.BLL.SQLRepository.StoredProcedure;


namespace OAuthLogin.BLL.Services
{
    public class LoginHistoryService : ILoginHistoryService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        private readonly IProcedureManager _procedureManager;
        private readonly IMapper _mapper;

        public LoginHistoryService(UserManager<ApplicationUser> userManager, IConfiguration configuration, IEmailService emailService, IProcedureManager procedureManager, IMapper mapper)
        {
            _userManager = userManager;
            _configuration = configuration;
            _emailService = emailService;
            _procedureManager = procedureManager;
            _mapper = mapper;
        }

        public Task<VMAddLoginHistoryResponse> AddLoginHistory(VMAddLoginHistory vMAddLoginHistory)
        {
            throw new NotImplementedException();
        }

        public Task<VMGetLoginHistories> GetAllLoginHistories(VMGetHistoriesInput vMGetHistoriesInput)
        {
            var spParameters = new VMGetUsersInput
            {

                Page = vMGetHistoriesInput.Page,
                PageSize = vMGetHistoriesInput.PageSize,
                Field = vMGetHistoriesInput.Field == "" ? "date" : vMGetHistoriesInput.Field,
                Sort = vMGetHistoriesInput.Sort == "" ? "desc" : vMGetHistoriesInput.Sort,
                Text = vMGetHistoriesInput.Text ?? "",
                ToDate = vMGetHistoriesInput.ToDate ?? "",
                FromDate = vMGetHistoriesInput.FromDate ?? "",
                UserIds = vMGetHistoriesInput.UserIds ?? "",

            };

            var loginHistories = _procedureManager.ExecStoreProcedureMulResults<StoredProcedureCommonModel, VMSpGetLoginHistories>(StoredProcedure.GetLoginHistory, spParameters);

            var countData = loginHistories.Item1[0].Count;
            var loginHistoriesData = loginHistories.Item2;


            VMGetLoginHistories getEmployees = new VMGetLoginHistories
            {
                Count = (int)countData,
                LoginHistories = loginHistoriesData
            };

            return Task.FromResult(getEmployees);
        }
    }
}
