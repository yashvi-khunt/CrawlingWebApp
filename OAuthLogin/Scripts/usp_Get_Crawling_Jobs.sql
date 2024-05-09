USE [OAuthLoginDb]
GO

/****** Object:  StoredProcedure [dbo].[usp_Get_Crawling_Jobs]    Script Date: 09-05-2024 11:04:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_Get_Crawling_Jobs] 
	-- Add the parameters for the stored procedure here
	@Field NVARCHAR(50) = 'date', --code
    @Sort NVARCHAR(50) = 'desc', -- asc
    @Page BIGINT = 1,
    @PageSize BIGINT = 10
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	
DROP TABLE IF EXISTS #tempCrawlingJobs
    -- Insert statements for procedure here
	SELECT j.Id,max(jr.ParamOrder) as ResultCount INTO #tempCrawlingJobs
	FROM Jobs j
	--inner join AspNetUsers
	--WHERE
	inner join JobParameters jp on jp.JobId = j.Id
	inner join JobResponses jr on jr.JobParameterId = jp.Id
	GROUP BY J.Id

	 -- It returns number of users after applying filters.
   SELECT Count(*) AS count FROM #tempCrawlingJobs

   -- it returns all data for users from #tempLoginHistory
    SELECT 
    ROW_NUMBER() OVER (Order By 
	 CASE WHEN @Field = 'name' AND @Sort = 'asc' THEN j.Name END ASC,
     CASE WHEN @Field = 'name' AND @Sort = 'desc' THEN j.Name END DESC,
     --CASE WHEN @Field = 'date' AND @Sort = 'asc' THEN lh.datetime END ASC,
     --CASE WHEN @Field = 'date' AND @Sort = 'desc' THEN lh.datetime END DESC,
	 CASE WHEN @Field = 'resultCount' AND @Sort = 'asc' THEN tcj.ResultCount END ASC,
     CASE WHEN @Field = 'resultCount' AND @Sort = 'desc' THEN tcj.ResultCount END DESC
     )
     AS Id ,
	 j.Id AS JobId,j.Name,j.URL,ResultCount
	 FROM Jobs j
	 --INNER JOIN AspnetUsers a ON a.Id = j.UserId
	 Left JOIN #tempCrawlingJobs tcj ON tcj.Id = j.Id	

	 order by Id
    OFFSET (@Page-1) * @pageSize ROWS FETCH NEXT @pagesize ROWS ONLY


END
GO

